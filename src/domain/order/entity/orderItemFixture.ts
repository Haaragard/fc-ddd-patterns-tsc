import OrderItem from "./orderItem";

export default class OrderItemFixture {
    public static create(parameters?: Object): OrderItem {
        return new OrderItem(
            parameters?.hasOwnProperty("id") ? parameters.id : "123",
            parameters?.hasOwnProperty("productId") ? parameters.productId : "123",
            parameters?.hasOwnProperty("name") ? parameters.name : "Item Name",
            parameters?.hasOwnProperty("quantity") ? parameters.quantity : 1,
            parameters?.hasOwnProperty("price") ? parameters.price : 123
        );
    }
}