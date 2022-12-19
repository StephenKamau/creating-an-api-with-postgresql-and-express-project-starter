import express, {Request, Response} from "express";
import {User, UserStore} from "../models/users";

const store = new UserStore();
const index = async (_request: Request, response: Response) => {
    try {
        const users = await store.index();
        response.json(users);
    } catch (err: any) {
        response.status(400);
        response.json({error: err.message});
    }
};

const show = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    try {
        const user = await store.show(id);
        response.json(user);
    } catch (err: any) {
        response.status(404);
        response.json({error: err.message});
    }
};

const create = async (request: Request, response: Response) => {
    const user: User = {
        firstname: request.body.firstname,
        lastname: request.body.lastname,
        password: request.body.password,
        id: 0,
    };
    try {
        const createdUser: User = await store.create(user);
        response.status(201);
        response.json(createdUser);
    } catch (err: any) {
        response.status(400);
        response.json({error: err.message});
    }
};

const usersRoutes = (app: express.Application) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/users", create);
};

export default usersRoutes;
