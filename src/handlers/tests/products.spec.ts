import supertest from 'supertest';
import { Product } from '../../models/products';
import app from '../../server';

const request = supertest(app);
const authorization =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkVXNlciI6eyJpZCI6MywiZW1haWwiOiJzazFAbXlzdG9yZS5jb20iLCJmaXJzdG5hbWUiOiJTdGVwaGVuIiwibGFzdG5hbWUiOiJLIiwicGFzc3dvcmQiOiIifSwiaWF0IjoxNjcxNzE0MDUyfQ.MAe_vav48ym8pN61mYl6x1ynmIWVncHjOHSqZ2QfnjY';

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
      .set('Authorization', authorization);
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
