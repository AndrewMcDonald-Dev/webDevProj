import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import db from './mySQL';

export default class UserModel {
    static async createTable() {
        const sql = `
		CREATE TABLE IF NOT EXISTS user (
			user_id INT AUTO_INCREMENT,
			username VARCHAR(255) NOT NULL UNIQUE,
			email VARCHAR(255) NOT NULL,
			password VARCHAR(255) NOT NULL,
			pfp VARCHAR(255) NOT NULL,
			dob INT NOT NULL,
			created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
			CONSTRAINT user_pk PRIMARY KEY (user_id)
		)
	`;
        await db.query(sql);
    }

    static async getUsers(): Promise<User[]> {
        const sql = `
		SELECT * FROM user
		`;
        const users: User[] = await db.query(sql);
        return users.map((user) => ({ ...user, password: undefined }));
    }

    static async getUser(user_id: number): Promise<User> {
        const sql = `
		SELECT * FROM user
		WHERE user_id = ${user_id}
		`;
        const user = await db.query(sql);
        if (!user)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'User not found',
            };
        return { ...user[0], password: undefined };
    }

    static async getUserByUsername(username: string): Promise<User> {
        const sql = `
		SELECT * FROM user
		WHERE username = '${username}'
		`;

        const user = await db.query(sql);
        if (!user)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'User not found',
            };

        return { ...user[0], password: undefined };
    }

    static async login(email: string, password: string): Promise<User> {
        const sql = `
		SELECT * FROM user
		WHERE email = '${email}'
		`;
        const user = await db.query(sql);
        if (!user[0])
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'User not found',
            };

        if (!(await bcrypt.compare(password, user[0].password)))
            throw {
                statusCode: StatusCodes.UNAUTHORIZED,
                message: 'Incorrect password',
            };

        const data = { ...user[0], password: undefined };
        const token = jwt.sign(data, process.env.JWT_SECRET as string);

        return { ...data, token };
    }

    static async getByToken(token: string): Promise<User> {
        const data: any = jwt.verify(token, process.env.JWT_SECRET as string);
        const user = await this.getUser(data.user_id);
        if (!user)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'User not found',
            };
        return { ...user, password: undefined, token };
    }

    static fromToken(token: string): Promise<User> {
        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                process.env.JWT_SECRET as string,
                (err, decoded) => {
                    if (err) reject(err);
                    resolve(decoded as User);
                }
            );
        });
    }

    static async remove(user_id: number): Promise<User> {
        const findSql = `
		SELECT * from user
		WHERE user_id = ${user_id}
		`;
        const user = await db.query(findSql);
        if (!user)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'User not found',
            };

        const deleteSql = `
		DELETE FROM user
		WHERE user_id = ${user_id}
		`;
        await db.query(deleteSql);
        return { ...user[0], password: undefined };
    }

    static async update(user_id: number, user: User): Promise<User> {
        if (user.password)
            user.password = await bcrypt.hash(
                user.password,
                parseInt(process.env.SALT_ROUNDS as string)
            );

        const findSql = `
		SELECT * from user
		WHERE user_id = ${user_id}
		`;
        const userFound = await db.query(findSql);
        if (!userFound)
            throw {
                statusCode: StatusCodes.NOT_FOUND,
                message: 'User not found',
            };

        const updateSql = `
		UPDATE user SET
		username = '${user.username}',
		email = '${user.email}',
		password = '${user.password}',
		pfp = '${user.pfp}',
		dob = ${user.dob}
		WHERE user_id = ${user_id}
		`;

        await db.query(updateSql);
        return await this.getUser(user_id);
    }

    static async create(user: User): Promise<User> {
        if (!user.password)
            throw {
                statusCode: StatusCodes.BAD_REQUEST,
                message: 'Password is required',
            };

        const findSql = `
			SELECT * from user
			WHERE username = '${user.username}'
			`;
        const userFound = await db.query(findSql);

        if (userFound[0])
            throw {
                statusCode: StatusCodes.BAD_REQUEST,
                message: 'Username already exists',
            };
        user.password = await bcrypt.hash(
            user.password,
            parseInt(process.env.SALT_ROUNDS as string)
        );

        const sql = `INSERT INTO user (username, email, password, pfp, dob)
		VALUES ('${user.username}', '${user.email}', '${user.password}', '${
            user.pfp
        }', ${Math.floor(new Date(user.dob).getTime() / 1000)})
		`;
        const newUser = await db.query(sql);

        user = await this.getUser(newUser.insertId);
        const token = jwt.sign(user, process.env.JWT_SECRET as string);

        return { ...user, password: undefined, token };
    }

    static async seed() {
        //Insert many users at once using create
        list.forEach(async (user) => await this.create(user));
        const newUsers: User[] = [];
        list.forEach(async (user) =>
            newUsers.push(await this.getUserByUsername(user.username))
        );
        return newUsers;
    }
}

UserModel.createTable();

const list: User[] = [
    {
        email: 'simple@email.com',
        username: 'cool',
        password: 'qwerty',
        pfp: 'https://randomuser.me/portraits/men/1.jpg',
        dob: new Date(),
    },
    {
        email: 'ohyeag@email.com',
        username: 'kool',
        password: 'qwerty',
        pfp: 'https://randomuser.me/portraits/men/2.jpg',
        dob: new Date(),
    },
    {
        email: 'is@email.com',
        username: 'awesome',
        password: 'qwerty',
        pfp: 'https://randomuser.me/portraits/women/1.jpg',
        dob: new Date(),
    },
];

export interface User {
    user_id?: number;
    email: string;
    username: string;
    password?: string;
    pfp: string;
    dob: Date;
    created_at?: Date;
    updated_at?: Date;
    token?: string;
}
