import client from "../database";

export type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
}

export class ProductStore {
    async create(product: Product): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO products(name,price,category) VALUES ($1,$2,$3) RETURNING *';
            const result = await conn.query(sql, [product.name, product.price, product.category]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to create product: ${product.name}. Error: ${err}`);
        }
    }

    async index(): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to fetch list of products. Error: ${err}`);
        }
    }

    async show(id: number): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
//            if (result.rows.length < 1) {
//                throw new Error(`Product not found.`)
//            }
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to fetch product with id ${id}. ${err}`);
        }
    }

    async productsByCategory(category: string): Promise<Product[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM products WHERE category=($1)';
            const result = await conn.query(sql, [category]);
            conn.release();
            if (result.rows.length < 1) {
                throw new Error(`Product(s) not found.`);
            }
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to fetch products under ${category} category. ${err}`);
        }
    }

    async put(product: Product): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE products SET name=($1), price=($2), category=($3) WHERE id=($4)';
            const result = await conn.query(sql, [product.name, product.price, product.category, product.id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to update product: ${product.name}. Error: ${err}`);
        }
    }

    async delete(id: number): Promise<Product> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM products WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to delete product with id ${id}. Error: ${err}`);
        }
    }
}