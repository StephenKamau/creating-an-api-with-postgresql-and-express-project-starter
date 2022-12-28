import supertest from 'supertest';
import { Product } from '../../models/products';
import app from '../../server';
import { authorization } from './orders.spec';

const request = supertest(app);
describe('Products handler', () => {
  it('create method should return a new product', async () => {
    const product: Product = {
      name: 'Test product',
      category: 'Test',
      price: 20,
      id: 0
    };
    const response = await request
      .post('/products')
      .send(product)
      .set('Authorization', await authorization('sk10@mystore.com'));
    expect(response.body.name).toEqual(product.name);
  });
  it('index method should return a list of products', async () => {
    const response = await request.get('/products');
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
  it('show method should return product with param id', async () => {
    const response = await request.get('/products/1');
    expect(response.body.id).toEqual(1);
  });
  it('products by category method should return product with param category', async () => {
    const response = await request.get('/products/category/Test');
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
});
