CREATE TABLE orders_products(
id SERIAL PRIMARY KEY,
orderid INTEGER REFERENCES orders(id),
productid INTEGER REFERENCES products(id),
quantity INTEGER
)
