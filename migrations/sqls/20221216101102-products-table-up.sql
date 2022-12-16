CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price INTEGER NOT NULL,
    category VARCHAR(100)
);