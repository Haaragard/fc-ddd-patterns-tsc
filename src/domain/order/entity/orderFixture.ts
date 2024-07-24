import Order from "./order";

export default class OrderFixture {
    public static create(parameters?: Object): Order {
        return new Order(
            parameters?.hasOwnProperty("id") ? parameters.id : "123",
            parameters?.hasOwnProperty("customerId") ? parameters.customerId : "123",
            parameters?.hasOwnProperty("items") ? parameters.items : []
        );
    }
}