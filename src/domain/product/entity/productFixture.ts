import Product from "./product";

export default class ProductFixture {
    public static create(parameters?: Object): Product {
        return new Product(
            parameters?.hasOwnProperty("id") ? parameters.id : "123",
            parameters?.hasOwnProperty("name") ? parameters.name : "Product Name",
            parameters?.hasOwnProperty("price") ? parameters.price : 123,
        );
    }
}