import {UserStore, User} from "../users";

const store = new UserStore();
describe("User model", () => {
    it("should have an index method", () => {
        expect(store.index).toBeDefined();
    });
    it("should have an show method", () => {
        expect(store.show).toBeDefined();
    });
    it("should have an create method", () => {
        expect(store.create).toBeDefined();
    });
    it("create method should return a new user", async () => {
        const result = await store.create({firstname: "Stephen", lastname: "K", password: "123456", id: 0});
        expect(result).toEqual({firstname: "Stephen", lastname: "K", password: "", id: 1});
    })
    it("show method should return user with id 1", async () => {
        const id: number = 1;
        const result = await store.show(1);
        expect(result.id).toEqual(id);
    })
    it("index method should return a list of products", async () => {
        const result = await store.index();
        expect(result).toEqual([{id: 1, firstname: "Stephen", lastname: "K"}]);
    })
});
