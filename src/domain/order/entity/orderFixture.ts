import Order from "./order";
import {v4 as uuid} from "uuid";

export default class OrderFixture {
    public static create(parameters?: Object): Order {
        return new Order(
            parameters?.hasOwnProperty("id") ? parameters.id : uuid(),
            parameters?.hasOwnProperty("customerId") ? parameters.customerId : "123",
            parameters?.hasOwnProperty("items") ? parameters.items : []
        );
    }
}