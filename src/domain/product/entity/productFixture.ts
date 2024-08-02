import Product from "./product";
import {v4 as uuid} from "uuid";

export default class ProductFixture {
    public static create(parameters?: Object): Product {
        return new Product(
            parameters?.hasOwnProperty("id") ? parameters.id : uuid(),
            parameters?.hasOwnProperty("name") ? parameters.name : "Product Name",
            parameters?.hasOwnProperty("price") ? parameters.price : 123,
        );
    }
}