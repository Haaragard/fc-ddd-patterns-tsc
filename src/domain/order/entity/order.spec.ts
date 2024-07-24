import Order from "./order";
import OrderFixture from "./orderFixture";
import OrderItemFixture from "./orderItemFixture";

describe("Order unit tests", () => {

    it("Should create an Order", () => {
        let order = OrderFixture.create();

        expect(order).toBeInstanceOf(Order);
    });
    
    it("Should retrieve id successfully", () => {
        let order = OrderFixture.create({
            id: "123",
        });

        expect(order.id).toBe("123");
    });
    
    it("Should retrieve customer id successfully", () => {
        let order = OrderFixture.create({
            customerId: "123",
        });

        expect(order.customerId).toBe("123");
    });

    it("Should retrieve total successfully", () => {
        let items = [
            OrderItemFixture.create({quantity: 1, price: 10}),
            OrderItemFixture.create({quantity: 2, price: 12}),
            OrderItemFixture.create({quantity: 3, price: 14}),
            OrderItemFixture.create({quantity: 4, price: 16}),
        ];
        let itemsTotal = items.reduce((acc, item) => acc + item.total(), 0);
        let order = OrderFixture.create({items});

        expect(order.total()).toBe(itemsTotal);
    });

    it("Should throw an error when id is empty", () => {
        expect(() => {
            OrderFixture.create({
                id: "",
            });
        }).toThrow("Id is required.");
    });

    it("Should throw an error when customer id is empty", () => {
        expect(() => {
            OrderFixture.create({
                customerId: "",
            });
        }).toThrow("Customer Id is required.");
    });

});