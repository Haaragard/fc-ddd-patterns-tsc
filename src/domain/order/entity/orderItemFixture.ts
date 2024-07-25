import OrderItem from "./orderItem";
import {v4 as uuid} from "uuid";

export default class OrderItemFixture {
    public static create(parameters?: Object): OrderItem {
        return new OrderItem(
            parameters?.hasOwnProperty("id") ? parameters.id : uuid(),
            parameters?.hasOwnProperty("productId") ? parameters.productId : uuid(),
            parameters?.hasOwnProperty("name") ? parameters.name : "Item Name",
            parameters?.hasOwnProperty("quantity") ? parameters.quantity : 1,
            parameters?.hasOwnProperty("price") ? parameters.price : 123
        );
    }
}