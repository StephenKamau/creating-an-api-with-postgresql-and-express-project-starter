import supertest from 'supertest';
import app from '../../server';
import bodyParser from 'body-parser';

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
    expect(response.status).toBe(201);
  });
  it('login endpoint should authenticate a user', async () => {
    const response = await request
      .post('/login')
      .send({ email: 'sk2@mystore.com', password: 'mystore' });
    expect(response.status).toBe(200);
  });
});
