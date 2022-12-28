CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(id),
    orderStatus VARCHAR(50)
);
