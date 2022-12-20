import { OrderStore, Order } from '../models/orders';
import express, { Request, Response } from 'express';

const ordersStore = new OrderStore();

const currentOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const activeOrder = await ordersStore.currentOrder(userId);
    res.json(activeOrder);
  } catch (err: any) {
    res.status(400);
    res.json({ error: err.message });
  }
};
const completeOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId);
    const orderStatus = 'complete';
    const completedOrders = await ordersStore.orderByUserAndOrderStatus(
      userId,
      orderStatus
    );
    res.json(completedOrders);
  } catch (err: any) {
    res.status(400);
    res.json({ error: err.message });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = {
      productid: parseInt(req.params.productId),
      userid: parseInt(req.params.userId),
      quantity: parseInt(req.body.quantity),
      orderstatus: 'active',
      id: 0
    };
    const createdOrder = await ordersStore.create(order);
    res.json(createdOrder);
  } catch (err: any) {
    res.status(400);
    res.json({ error: err.message });
  }
};

const ordersRoutes = (app: express.Application): void => {
  app.get('/orders/:userId', currentOrder);
  app.get('/orders/completed/:userId', completeOrders);
  app.post('/orders/:userId/:productId', create);
};

export default ordersRoutes;
