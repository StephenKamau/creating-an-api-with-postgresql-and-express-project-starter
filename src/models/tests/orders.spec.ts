import { OrderStore, Order } from '../orders';
import { UserStore } from '../users';
import { ProductStore } from '../products';
import { Order_products } from '../order_products';

const store = new OrderStore();

describe('Orders model', () => {
  beforeAll(async () => {
    const userStore = new UserStore();
    const productStore = new ProductStore();
    await userStore.create({
      email: 'sk1@testmail.com',
      firstname: 'Stephen',
      lastname: 'K',
      password: '123456',
      id: 0
    });
    await productStore.create({
      id: 1,
      name: 'Test product',
      price: 20,
      category: 'Test'
    });
  });
  it('should have index method', async () => {
    expect(store.index).toBeDefined();
  });
  it('should have create method', async () => {
    expect(store.create).toBeDefined();
  });
  it('should have put method', async () => {
    expect(store.put).toBeDefined();
  });
  it('should have delete method', async () => {
    expect(store.delete).toBeDefined();
  });
  it('create method should return a new order', async () => {
    const order: Order = {
      id: 1,
      userid: 1,
      orderstatus: 'active'
    };
    const createdOrder = await store.create(order);
    expect(createdOrder.userid).toEqual(order.userid);
  });
  it('index method should return a list of orders', async () => {
    const orders = await store.index();
    expect(orders.length).toBeGreaterThanOrEqual(1);
  });
  it('currentOrder method should return active order for the user id provided', async () => {
    const currentOrder = await store.currentOrder(1);
    expect(currentOrder.userid).toEqual(1);
  });
  it('put method should return an updated order', async () => {
    const order: Order = {
      id: 2,
      userid: 1,
      orderstatus: 'completed'
    };
    await store.put(order);
    const updatedOrder = await store.show(order.id);
    expect(updatedOrder).toEqual(order);
  });
  it('orderByUserAndStatus method should return order with the user id and orderStatus provided', async () => {
    const userid = 1;
    const orderStatus = 'completed';
    const result = await store.orderByUserAndOrderStatus(userid, orderStatus);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
  it('show method should return order with id provided', async () => {
    const order: Order = {
      id: 2,
      userid: 1,
      orderstatus: 'completed'
    };
    const result = await store.show(order.id);
    expect(result).toEqual(order);
  });
  it('delete method should drop the order with id provided', async () => {
    const id = 2;
    await store.delete(id);
    const fetchDeletedOrder = await store.show(id);
    expect(fetchDeletedOrder).toBeUndefined();
  });

  it('add product method should add the product to the join table', async () => {
    const orderProduct: Order_products = {
      id: 0,
      orderid: 1,
      productid: 1,
      quantity: 2
    };
    const order: Order = {
      id: 0,
      userid: 1,
      orderstatus: 'active'
    };
    await store.create(order);
    const result = await store.addProduct(orderProduct);
    expect(result.orderid).toEqual(orderProduct.orderid);
  });
});
