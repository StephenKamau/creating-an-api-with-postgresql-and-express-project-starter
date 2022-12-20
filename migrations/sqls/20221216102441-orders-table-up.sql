CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    productId INTEGER REFERENCES products(id),
    quantity INTEGER NOT NULL,
    userId INTEGER REFERENCES users(id),
    orderStatus VARCHAR(50)
);