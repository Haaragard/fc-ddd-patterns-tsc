import OrderItem from "./orderItem";
import OrderItemFixture from "./orderItemFixture";

describe("Order Items unit tests", () => {

    it("Should create an Order Item", () => {
        let orderItem = OrderItemFixture.create();

        expect(orderItem).toBeInstanceOf(OrderItem);
    });

    it("Should retrieve id successfully", () => {
        let orderItem = OrderItemFixture.create({
            id: "123",
        });

        expect(orderItem.id).toBe("123");
    });

    it("Should retrieve product id successfully", () => {
        let orderItem = OrderItemFixture.create({
            productId: "123",
        });

        expect(orderItem.productId).toBe("123");
    });

    it("Should retrieve name successfully", () => {
        let orderItem = OrderItemFixture.create({
            name: "Item Name",
        });

        expect(orderItem.name).toBe("Item Name");
    });

    it("Should retrieve quantity successfully", () => {
        let orderItem = OrderItemFixture.create({
            quantity: 5,
        });

        expect(orderItem.quantity).toBe(5);
    });

    it("Should retrieve quantity successfully", () => {
        let orderItem = OrderItemFixture.create({
            price: 100,
        });

        expect(orderItem.price).toBe(100);
    });

    it("Should throw an error when id is empty", () => {
        expect(() => {
            OrderItemFixture.create({
                id: "",
            });
        }).toThrow("Id is required.");
    });

    it("Should throw an error when product id is empty", () => {
        expect(() => {
            OrderItemFixture.create({
                productId: "",
            });
        }).toThrow("Product Id is required.");
    });

    it("Should throw an error when name is empty", () => {
        expect(() => {
            OrderItemFixture.create({
                name: "",
            });
        }).toThrow("Name is required.");
    });

    it("Should throw an error when quantity is less or equals zero", () => {
        expect(() => {
            OrderItemFixture.create({
                quantity: 0,
            });
        }).toThrow("Quantity should be greater than zero.");
    });

    it("Should throw an error when quantity is less or equals zero", () => {
        expect(() => {
            OrderItemFixture.create({
                price: 0,
            });
        }).toThrow("Price should be greater than zero.");
    });

});