import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/orderItem";
import {v4 as uuid} from "uuid";

export default class OrderService {
    public static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (items.length === 0) {
            throw new Error("Order must have at least one item.");
        }

        let order = new Order(uuid(), customer.id, items);

        customer.addRewardPoints(order.total()/2);

        return order;
    }

    public static total(orders: Order[]): number {
        return orders.reduce(
            (acc, order) => acc + order.total(), 0
        );
    }
}