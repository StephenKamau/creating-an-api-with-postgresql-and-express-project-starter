import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/users';
import jwt from 'jsonwebtoken';

const store = new UserStore();
const index = async (request: Request, response: Response): Promise<void> => {
  try {
    const authorizationHeader: string = request.headers.authorization!;
    const token: string = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (err: any) {
    response.status(401);
    response.json({ error: err.message });
    return;
  }
  try {
    const users = await store.index();
    response.json(users);
  } catch (
    err: any // error can be of unknown type hence any used
  ) {
    response.status(400);
    response.json({ error: err.message });
  }
};

const show = async (request: Request, response: Response): Promise<void> => {
  try {
    const authorizationHeader: string = request.headers.authorization!;
    const token: string = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET!);
  } catch (err: any) {
    response.status(401);
    response.json({ error: err.message });
    return;
  }
  try {
    const id = parseInt(request.params.id);
    const user = await store.show(id);
    response.json(user);
  } catch (
    err: any // error can be of unknown type hence any used
  ) {
    response.status(404);
    response.json({ error: err.message });
  }
};

const create = async (request: Request, response: Response): Promise<void> => {
  try {
    const user: User = {
      email: request.body.email,
      firstname: request.body.firstname,
      lastname: request.body.lastname,
      password: request.body.password,
      id: 0
    };
    const createdUser: User = await store.create(user);
    response.status(201);
    const token = jwt.sign(createdUser, process.env.TOKEN_SECRET!);
    response.json(token);
  } catch (
    err: any // error can be of unknown type hence any used
  ) {
    response.status(400);
    response.json({ error: err.message });
  }
};

const authenticate = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const email = request.body.email;
    const password = request.body.password;
    const authUser = await store.authenticate(email, password);
    if (authUser == null) {
      throw new Error(
        'Unable to authenticate user with the credentials provided.'
      );
    }
    const token = jwt.sign(authUser, process.env.TOKEN_SECRET!);
    response.status(200);
    response.json({ token });
  } catch (
    err: any // error can be of unknown type hence any used
  ) {
    response.status(400);
    response.json({ error: err.message });
  }
};

const usersRoutes = (app: express.Application): void => {
  app.post('/login', authenticate);
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
};

export default usersRoutes;
