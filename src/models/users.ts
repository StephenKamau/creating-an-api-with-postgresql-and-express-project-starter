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
            const sql = "SELECT id, firstname,lastname FROM users WHERE id = ($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to fetch user with id: ${id}. ${err}`);
        }
    }

    async put(user: User): Promise<User> {
        try {
            const conn = await client.connect();
            const sql: string =
                "UPDATE users SET firstname=($1), lastname=($2) WHERE id=($3)";
//            const passwordDigest: string = bcrypt.hashSync(
//                user.password! + SALT,
//                parseInt(SALT_ROUNDS!)
//            );
            const result = await conn.query(sql, [
                user.firstname,
                user.lastname,
                user.id
            ]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to update ${user.firstname}. ${err}`);
        }
    }

    async delete(id: number): Promise<User> {
        try {
            const conn = await client.connect();
            const sql = "DELETE FROM users WHERE id = ($1)";
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to delete user with id: ${id}. ${err}`);
        }
    }
}
