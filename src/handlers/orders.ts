import { OrderStore, Order } from '../models/orders';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Order_products } from '../models/order_products';

const ordersStore = new OrderStore();

const currentOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const authorizationHeader: string = req.headers.authorization!;
    const token: string = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (err: any) {
    res.status(401);
    res.json({ error: err.message });
    return;
  }
  try {
    const userId = parseInt(req.params.userId);
    const activeOrder = await ordersStore.currentOrder(userId);
    res.json(activeOrder);
  } catch (
    err: any //  error can be of unknown type hence any used
  ) {
    res.status(400);
    res.json({ error: err.message });
  }
};
const completeOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const authorizationHeader: string = req.headers.authorization!;
    const token: string = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (err: any) {
    res.status(401);
    res.json({ error: err.message });
    return;
  }
  try {
    const userId = parseInt(req.params.userId);
    const orderStatus = 'complete';
    const completedOrders = await ordersStore.orderByUserAndOrderStatus(
      userId,
      orderStatus
    );
    res.json(completedOrders);
  } catch (
    err: any // error can be of unknown type hence any used
  ) {
    res.status(400);
    res.json({ error: err.message });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const authorizationHeader: string = req.headers.authorization!;
    const token: string = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (
    err: any // error can be of unknown type hence any used
  ) {
    res.status(401);
    res.json({ error: err.message });
    return;
  }
  try {
    const order: Order = {
      userid: parseInt(req.params.userId),
      orderstatus: 'active',
      id: 0
    };
    const createdOrder = await ordersStore.create(order);
    res.status(201);
    res.json(createdOrder);
  } catch (
    err: any // error can be of unknown type hence any used
  ) {
    res.status(400);
    res.json({ error: err.message });
  }
};

const addProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const authorizationHeader: string = req.headers.authorization!;
    const token: string = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (
    err: any // error can be of unknown type hence any used
  ) {
    res.status(401);
    res.json({ error: err.message });
    return;
  }
  try {
    const orderProduct: Order_products = {
      id: 0,
      orderid: parseInt(req.params.orderId),
      productid: parseInt(req.body.productid),
      quantity: parseInt(req.body.quantity)
    };
    const createdOrderProduct = await ordersStore.addProduct(orderProduct);
    res.status(201);
    res.json(createdOrderProduct);
  } catch (
    err: any // error can be of unknown type hence any used
  ) {
    res.status(400);
    res.json({ error: err.message });
  }
};

const ordersRoutes = (app: express.Application): void => {
  app.get('/orders/:userId', currentOrder);
  app.get('/orders/completed/:userId', completeOrders);
  app.post('/orders/:userId', create);
  app.post('/orders/:orderId/products', addProduct);
};

export default ordersRoutes;
