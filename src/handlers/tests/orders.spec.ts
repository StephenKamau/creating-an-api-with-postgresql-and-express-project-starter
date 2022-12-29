import supertest from 'supertest';
import app from '../../server';
import { Order } from '../../models/orders';
import { Order_products } from '../../models/order_products';
import { Product } from '../../models/products';

const request = supertest(app);
export const authorization = async (email: string): Promise<string> => {
  try {
    const response = await request.post('/users').send({
      firstname: 'Stephen',
      email,
      lastname: 'K',
      password: 'mystore'
    });
    return `Bearer ${response.body}`;
  } catch (err) {
    throw new Error(`Unable to login. ${err}`);
  }
};

describe('Orders handler', () => {
  it('current order method should return active order for the user id param', async () => {
    const response = await request
      .get('/orders/1')
      .set('Authorization', await authorization('sk3@mystore.com'));
    expect(response.body).toEqual('');
  });
  it('completed orders method should return complete orders for the user id param', async () => {
    const response = await request
      .get('/orders/completed/1')
      .set('Authorization', await authorization('sk4@mystore.com'));
    expect(response.body).toEqual([]);
  });
  it('create method should return new order', async () => {
    const data: Order = {
      id: 0,
      userid: 1,
      orderstatus: 'active'
    };
    const response = await request
      .post(`/orders/${data.userid}`)
      .send(data)
      .set('Authorization', await authorization('sk5@mystore.com'));
    expect(response.status).toEqual(201);
    expect(response.body.userid).toEqual(data.userid);
  });
  it('add product method should return Order product', async () => {
    const product: Product = {
      name: 'Test product',
      category: 'Test',
      price: 20,
      id: 0
    };
    const createdProduct = (await request.post('/products').send(product).set('Authorization', await authorization('sk45@mystore.com'))).body;
    const data: Order_products = {
      id: 0,
      orderid: 1,
      productid: createdProduct.id,
      quantity: 2
    };
    const response = await request.post(`/orders/${data.orderid}/products`).send(data).set('Authorization', await authorization('sk40@mystore.com'));
    expect(response.status).toEqual(201);
    expect(response.body.productid).toEqual(data.productid);
  });
});
