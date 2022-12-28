import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
const authorization =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkVXNlciI6eyJpZCI6MywiZW1haWwiOiJzazFAbXlzdG9yZS5jb20iLCJmaXJzdG5hbWUiOiJTdGVwaGVuIiwibGFzdG5hbWUiOiJLIiwicGFzc3dvcmQiOiIifSwiaWF0IjoxNjcxNzE0MDUyfQ.MAe_vav48ym8pN61mYl6x1ynmIWVncHjOHSqZ2QfnjY';

describe('Orders handler', () => {
  it('current order method should return active order for the user id param', async () => {
    const response = await request
      .get('/orders/1')
      .set('Authorization', authorization);
    expect(response.body).toEqual([]);
  });
  it('completed orders method should return complete orders for the user id param', async () => {
    const response = await request
      .get('/orders/completed/1')
      .set('Authorization', authorization);
    expect(response.body).toEqual([]);
  });
});
