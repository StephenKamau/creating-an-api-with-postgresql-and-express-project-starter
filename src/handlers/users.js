"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const store = new users_1.UserStore();
const index = async (_request, response) => {
    try {
        const users = await store.index();
        response.json(users);
    }
    catch (err) {
        response.status(400);
        response.json(err);
    }
};
const show = async (request, response) => {
    const id = parseInt(request.params.id);
    try {
        const user = await store.show(id);
        response.json(user);
    }
    catch (err) {
        response.status(404);
        response.json(err);
    }
};
const create = async (request, response) => {
    const user = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        password: request.body.password,
        id: 0,
    };
    try {
        const createdUser = await store.create(user);
        response.status(201);
        response.json(createdUser);
    }
    catch (err) {
        response.status(400);
        response.json(err);
    }
};
const usersRoutes = (app) => {
    app.get("/users", index);
    app.get("/users/:id", show);
    app.post("/users", create);
};
exports.default = usersRoutes;
