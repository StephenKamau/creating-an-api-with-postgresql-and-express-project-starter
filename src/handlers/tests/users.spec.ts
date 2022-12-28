import supertest from 'supertest';
import app from '../../server';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { User } from '../../models/users';

app.use(bodyParser);
const request = supertest(app);
describe('User Handler', () => {
  it('create method should create a new user', async () => {
    const response = await request.post('/users').send({
      firstname: 'Stephen',
      email: 'sk2@mystore.com',
      lastname: 'K',
      password: 'mystore'
    });
    const decodedToken = jwt.verify(
      response.body,
      process.env.TOKEN_SECRET!
    ) as User;
    expect(response.status).toBe(201);
    expect(decodedToken.email).toEqual('sk2@mystore.com');
  });
  it('login endpoint should authenticate a user', async () => {
    const credentials = {
      email: 'sk2@mystore.com',
      password: 'mystore'
    };
    const response = await request.post('/login').send({
      email: 'sk2@mystore.com',
      password: 'mystore'
    });
    const decodedToken: string = JSON.stringify(
      jwt.verify(response.body.token, process.env.TOKEN_SECRET!)
    );
    expect(decodedToken).toContain(credentials.email);
    expect(response.status).toBe(200);
  });
  it('show method should return user with param id', async () => {
    const authorization =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkVXNlciI6eyJpZCI6MywiZW1haWwiOiJzazFAbXlzdG9yZS5jb20iLCJmaXJzdG5hbWUiOiJTdGVwaGVuIiwibGFzdG5hbWUiOiJLIiwicGFzc3dvcmQiOiIifSwiaWF0IjoxNjcxNzE0MDUyfQ.MAe_vav48ym8pN61mYl6x1ynmIWVncHjOHSqZ2QfnjY';
    const response = await request
      .get('/users/1')
      .set('Authorization', authorization);
    expect(response.body.email).toEqual('sk2@mystore.com');
  });
});
