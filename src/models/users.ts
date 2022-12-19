import client from "../database";
import bcrypt from "bcrypt";

const {SALT, SALT_ROUNDS} = process.env;

export type User = {
    id: number;
    firstname: string;
    lastname: string;
    password: string;
};

export type UserQueryResult = {
    id: number;
    firstname: string;
    lastname: string;
};

export class UserStore {
    async index(): Promise<UserQueryResult[]> {
        try {
            const conn = await client.connect();
            const sql = "SELECT id, firstName, lastName FROM users";
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to fetch users. ${err}`);
        }
    }

    async create(user: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql: string =
                "INSERT INTO users(firstName, lastName, password)VALUES($1, $2, $3) RETURNING *";
            const passwordDigest: string = bcrypt.hashSync(
                user.password! + SALT,
                parseInt(SALT_ROUNDS!)
            );
            const result = await conn.query(sql, [
                user.firstname,
                user.lastname,
                passwordDigest,
            ]);
            conn.release();
            const createdUser = result.rows[0];
            createdUser.password = "";
            return createdUser
        } catch (err) {
            throw new Error(`Unable to create ${user.firstname}. ${err}`);
        }
    }

    async show(id: number): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = "SELECT id, firstName,lastName FROM users WHERE id = ($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            if (result.rows.length < 1) {
                throw new Error(`User not found`);
            }
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to fetch user with id: ${id}. ${err}`);
        }
    }
}
