CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    productId BIGINT REFERENCES products(id),
    quantity INTEGER NOT NULL,
    userId BIGINT REFERENCES users(id),
    orderStatus VARCHAR(50)
);