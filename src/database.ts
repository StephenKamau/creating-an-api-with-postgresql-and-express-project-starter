import dotenv from "dotenv";
import {Pool} from "pg";

dotenv.config();

const {
    POSTGRES_HOST,
    POSTGRES_USERNAME,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    POSTGRES_PASSWORD,
    ENV,
} = process.env;

let client: Pool | any;

if (ENV === "test") {
    client = new Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USERNAME,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_TEST_DB,
    });
}
if (ENV === "dev") {
    client = new Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USERNAME,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
    });
}

export default client;
