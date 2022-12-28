import client from '../database';
import { Order_products } from './order_products';

export interface Order {
  id: number;
  userid: number;
  orderstatus: string;
}

export interface OrderQueryResult {
  id: number;
  userid: number;
  firstname: string;
  lastname: string;
  orderstatus: string;
}

export class OrderStore {
  async currentOrder(userid: number): Promise<OrderQueryResult> {
    try {
      const orderStatus: string = 'active';
      const conn = await client.connect();
      const sql =
        'SELECT orders.id, userid, firstname, lastname, orderstatus FROM orders INNER JOIN users on orders.userid=users.id WHERE orderStatus=($1) and userid=($2) ORDER BY orders.id DESC LIMIT 1';
      const result = await conn.query(sql, [orderStatus, userid]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to fetch list of orders. ${err}`);
    }
  }

  async orderByUserAndOrderStatus(
    userid: number,
    orderStatus: string
  ): Promise<OrderQueryResult[]> {
    try {
      const conn = await client.connect();
      const sql =
        'SELECT orders.id, userid, firstname, lastname, orderstatus FROM orders INNER JOIN users on orders.userid=users.id WHERE orderStatus=($1) and userid=($2)';
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
      const sql =
        'SELECT orders.id, userid, firstname, lastname, orderstatus FROM orders INNER JOIN users on orders.userid=users.id';
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
      const sql =
        'INSERT INTO orders (userid,orderstatus) VALUES($1,$2) RETURNING *';
      const result = await conn.query(sql, [order.userid, order.orderstatus]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create order. ${err}`);
    }
  }

  async put(order: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        'UPDATE orders SET userid=($1), orderstatus=($2) WHERE id=($3)';
      const result = await conn.query(sql, [
        order.userid,
        order.orderstatus,
        order.id
      ]);
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

  async addProduct(orderProduct: Order_products): Promise<Order_products> {
    try {
      const conn = await client.connect();
      const sql =
        'INSERT INTO orders_products(orderid, productid, quantity) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        orderProduct.orderid,
        orderProduct.productid,
        orderProduct.quantity
      ]);
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add product. ${err}`);
    }
  }
}
