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
    it('should have put method', async () => {
        expect(store.put).toBeDefined();
    })
    it('should have delete method', async () => {
        expect(store.delete).toBeDefined();
    })
    it("create method should return a new user", async () => {
        const result = await store.create({firstname: "Stephen", lastname: "K", password: "123456", id: 0});
        expect(result).toEqual({firstname: "Stephen", lastname: "K", password: "", id: 2});
    })
    it("show method should return user with id 1", async () => {
        const id: number = 1;
        const result = await store.show(1);
        expect(result.id).toEqual(id);
    })
    it("index method should return a list of products", async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(1);
    })
    it('put method should update the user details', async () => {
        const user: User = {firstname: "Test", lastname: "User", password: "123456", id: 1}
        await store.put(user);
        const result = await store.show(user.id);
        expect(result.firstname).toEqual(user.firstname);
    })

    it('delete method should remove the user', async () => {
        const id: number = 2;
        await store.delete(id);
        const deletedUser = await store.show(id);
        expect(deletedUser).toBeUndefined();
    })
});
