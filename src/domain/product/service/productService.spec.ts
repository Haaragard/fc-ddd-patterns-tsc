import ProductFixture from "../entity/productFixture";
import ProductService from "./productService";

describe("Product service unit tests", () => {

    it("Should change the prices of all products", () => {
        let product1 = ProductFixture.create({
            id: "product-1",
            name: "Product 1",
            price: 10
        });
        let product2 = ProductFixture.create({
            id: "product-2",
            name: "Product 2",
            price: 20
        });
        let products = [product1, product2];
        
        ProductService.increasePrice(products, 100);

        expect(product1.price).toBe(20);
        expect(product2.price).toBe(40);
    });

});