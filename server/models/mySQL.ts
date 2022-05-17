import 'dotenv/config';
import mysql from 'mysql2';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
});

class Database {
    public conn: mysql.Pool;

    constructor() {
        this.conn = pool;
    }

    query(sql: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.conn.query(sql, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
}

export default new Database();
