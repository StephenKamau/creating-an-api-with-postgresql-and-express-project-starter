import {ProductStore, Product} from "../products";

const store = new ProductStore();
describe('Product model', () => {
    it('should have index method', async () => {
        expect(store.index).toBeDefined();
    })
    it('should have create method', async () => {
        expect(store.create).toBeDefined();
    })
    it('should have show method', async () => {
        expect(store.show).toBeDefined();
    })
    it('should have product by category method', async () => {
        expect(store.productsByCategory).toBeDefined();
    })
    it('should have put method', async () => {
        expect(store.put).toBeDefined();
    })
    it('should have delete method', async () => {
        expect(store.delete).toBeDefined();
    })
    it('create method should return a new product', async () => {
        const product: Product = {
            id: 2,
            name: 'Test product',
            price: 20,
            category: 'Test'
        }
        const newProduct = await store.create(product);
        expect(newProduct).toEqual(product);
    })
    it('index method should return a list of products', async () => {
        const products: Product[] = await store.index();
        expect(products.length).toBeGreaterThanOrEqual(1);
    })
    it('show method should return product with id provided', async () => {
        const id: number = 1;
        const product: Product = {
            id: 1,
            name: 'Test product',
            price: 20,
            category: 'Test'
        }
        const productResult: Product = await store.show(id);
        expect(productResult).toEqual(product);
    })

    it('productByCategory method should return products under the category provided', async () => {
        const category: string = 'Test';
        const products: Product[] = await store.productsByCategory(category);
        expect(products.length).toBeGreaterThanOrEqual(1);
    })

    it('put method should update the product', async () => {
        const product: Product = {
            id: 1,
            name: 'Test product 1',
            price: 200,
            category: 'Test update'
        }
        await store.put(product);
        const result = await store.show(product.id);
        expect(result).toEqual(product);
    })

    it('delete method should remove the product', async () => {
        const id: number = 2;
        await store.delete(id);
        const deletedProduct = await store.show(id);
        expect(deletedProduct).toBeUndefined();
    })
})