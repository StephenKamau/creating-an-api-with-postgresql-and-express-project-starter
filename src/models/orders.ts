import client from "../database";

export type Order = {
    id: number;
    productid: number;
    quantity: number;
    userid: number;
    orderstatus: string;
}

export type OrderQueryResult = {
    id: number;
    productid: number;
    productname: string;
    quantity: number;
    userid: number;
    firstname: string;
    lastname: string;
    orderstatus: string;
}

export class OrderStore {
    async currentOrder(userid: number): Promise<OrderQueryResult[]> {
        try {
            const orderStatus: string = 'active';
            const conn = await client.connect();
            const sql = 'SELECT orders.id, productid, products.name \"productname\", quantity, userid, firstname, lastname, orderstatus FROM orders INNER JOIN users on orders.userid=users.id INNER JOIN products on orders.productid=products.id WHERE orderStatus=($1) and userid=($2) ORDER BY orders.id DESC';
            const result = await conn.query(sql, [orderStatus, userid]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to fetch list of orders. ${err}`);
        }
    }

    async orderByUserAndOrderStatus(userid: number, orderStatus: string): Promise<OrderQueryResult[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT orders.id, productid, products.name \"productname\", quantity, userid, firstname, lastname, orderstatus FROM orders INNER JOIN users on orders.userid=users.id INNER JOIN products on orders.productid=products.id WHERE orderStatus=($1) and userid=($2)';
            const result = await conn.query(sql, [orderStatus, userid]);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to fetch list of orders. ${err}`);
        }
    }

    async index(): Promise<OrderQueryResult[]> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT orders.id, productid, products.name \"productname\", quantity, userid, firstname, lastname, orderstatus FROM orders INNER JOIN users on orders.userid=users.id INNER JOIN products on orders.productid=products.id';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (err) {
            throw new Error(`Unable to fetch list of orders. ${err}`);
        }
    }

    async create(order: Order): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'INSERT INTO orders (productid,quantity,userid,orderstatus) VALUES($1,$2,$3,$4) RETURNING *';
            const result = await conn.query(sql, [order.productid, order.quantity, order.userid, order.orderstatus]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to create order. ${err}`);
        }
    }

    async put(order: Order): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'UPDATE orders SET productid=($1), quantity=($2), userid=($3), orderstatus=($4) WHERE id=($5)';
            const result = await conn.query(sql, [order.productid, order.quantity, order.userid, order.orderstatus, order.id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to create order. ${err}`);
        }
    }

    async delete(id: number): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'DELETE FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to delete order with id ${id}. ${err}`);
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const conn = await client.connect();
            const sql = 'SELECT * FROM orders WHERE id=($1)';
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Unable to fetch order with id ${id}. ${err}`);
        }
    }
}