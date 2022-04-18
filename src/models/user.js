const list = [
    {
        firstName: 'Andrew',
        lastName: 'McDonald',
        email: 'simple@email.com',
        id: 1,
        password: 'qwerty',
    },
    {
        firstName: 'Koolaid',
        lastName: 'Guy',
        email: 'ohyeag@email.com',
        id: 2,
        password: 'qwerty',
    },
    {
        firstName: 'Type',
        lastName: 'Script',
        email: 'is@email.com',
        id: 3,
        password: 'qwerty',
    },
];

let highestId = 3;

const session = {
    user: {},
};

const user = localStorage.getItem('user');
if (user) session.user = JSON.parse(user);

const register = (firstName, lastName, email, password) => {
    const user = list.find((user) => user.email === email);
    if (user) {
        throw {
            statusCode: 409,
            message: 'User already exists',
        };
    }
    const newUser = {
        firstName,
        lastName,
        email,
        id: highestId + 1,
        password,
    };
    list.push(newUser);
    session.user = newUser;
    return newUser;
};

const getUser = (id) => {
    const user = list.find((user) => user.id === id);
    if (user) return user;

    throw { statusCode: 404, message: 'User not found' };
};

const login = (email, password) => {
    const user = list.find(
        (user) => user.email === email && user.password === password
    );
    if (user) {
        session.user = user;
        return user;
    }
    throw {
        statusCode: 401,
        message: 'Invalid credentials',
    };
};

const logout = () => {
    session.user = {};
};
