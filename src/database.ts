import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_USERNAME,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_PASSWORD,
  ENV
} = process.env;

const client: Pool = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: ENV === 'test' ? POSTGRES_TEST_DB : POSTGRES_DB
});

export default client;
