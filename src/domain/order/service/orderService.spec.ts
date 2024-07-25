import CustomerFixture from "../../customer/entity/customerFixture";
import OrderFixture from "../entity/orderFixture";
import OrderItemFixture from "../entity/orderItemFixture";
import OrderService from "./orderService";

describe("Order service unit tests", () => {

    it("Should place an order", () => {
        let customer = CustomerFixture.create({
            id: "customer-1",
            name: "Customer 1",
        });
        let orderItem1 = OrderItemFixture.create({
            id: "order-item-1",
            productId: "product-1",
            name: "Order Item 1",
            price: 10,
            quantity: 1
        });

        let order = OrderService.placeOrder(customer, [orderItem1]);

        expect(customer.rewardPoints).toBe(5);
        expect(order.total()).toBe(10);
    });

    it("Should get total of all orders", () => {
        let orderItem1 = OrderItemFixture.create({
            id: "order-item-1",
            productId: "product-1",
            name: "Order Item 1",
            price: 100,
            quantity: 1
        });
        let orderItem2 = OrderItemFixture.create({
            id: "order-item-2",
            productId: "product-2",
            name: "Order Item 2",
            price: 200,
            quantity: 2
        });

        let order1 = OrderFixture.create({
            id: "order-1",
            customerId: "customer-1",
            items: [orderItem1]
        });
        let order2 = OrderFixture.create({
            id: "order-2",
            customerId: "customer-2",
            items: [orderItem2]
        })

        let total = OrderService.total([order1, order2]);

        expect(total).toBe(500);
    });

});