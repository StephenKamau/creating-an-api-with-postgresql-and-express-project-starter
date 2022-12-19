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
    it('create method should return a new product', async () => {
        const product: Product = {
            id: 1,
            name: 'Test product',
            price: 20,
            category: 'Test'
        }
        const newProduct = await store.create(product);
        expect(newProduct).toEqual(product);
    })
    it('index method should return a list of products', async () => {
        const product: Product = {
            id: 1,
            name: 'Test product',
            price: 20,
            category: 'Test'
        }
        const products: Product[] = await store.index();
        expect(products).toEqual([product]);
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
        const product: Product = {
            id: 1,
            name: 'Test product',
            price: 20,
            category: 'Test'
        }
        const products: Product[] = await store.productsByCategory(category);
        expect(products).toEqual([product]);
    })
})