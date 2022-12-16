import dotenv from "dotenv";
import { Pool } from "pg";
dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_USERNAME,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_PASSWORD,
  ENV,
} = process.env;

let connection: Pool | undefined;

if (ENV === "test") {
  connection = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_TEST_DB,
  });
} else if (ENV === "dev") {
  connection = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USERNAME,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
  });
}

export default connection;
