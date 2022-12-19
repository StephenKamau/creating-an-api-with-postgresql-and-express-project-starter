import {Product, ProductStore} from "../models/products";
import express, {Request, Response} from 'express';

const productStore = new ProductStore();

const index = async (req: Request, res: Response) => {
    try {
        const products = await productStore.index();
        res.json(products);
    } catch (err: any) {
        res.status(400);
        res.json({error: err.message});
    }

}

const show = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const product = await productStore.show(id);
        res.json(product);
    } catch (err: any) {
        res.status(400);
        res.json({error: err.message});
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: parseInt(req.body.price),
            category: req.body.category,
            id: 0
        };
        const createdProduct = await productStore.create(product);
        res.status(201);
        res.json(createdProduct);
    } catch (err: any) {
        res.status(400);
        res.json({error: err.message});
    }
}

const productsByCategory = async (req: Request, res: Response) => {
    try {
        const category = req.params.category;
        const product = await productStore.productsByCategory(category);
        res.json(product);
    } catch (err: any) {
        res.status(400);
        res.json({error: err.message});
    }
}

const productsRoutes = (app: express.Application) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.get('/products/category/:category', productsByCategory);
    app.post('/products', create);
}

export default productsRoutes;