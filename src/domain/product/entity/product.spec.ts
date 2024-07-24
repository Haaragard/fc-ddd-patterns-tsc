import Product from "./product";
import ProductFixture from "./productFixture";

describe("Product unit tests", () => {

    it("Should create a new product", () => {
        let product = ProductFixture.create();

        expect(product).toBeInstanceOf(Product);
    });

    it("Should retrieve a product id successfully", () => {
        let product = ProductFixture.create({
            id: "123",
        });

        expect(product.id).toBe("123");
    });

    it("Should retrive a product name successfully", () => {
        let product = ProductFixture.create({
            name: "Product Name",
        });

        expect(product.name).toBe("Product Name");
    });

    it("Should retrieve a product price successfully", () => {
        let product = ProductFixture.create({
            price: 123,
        });

        expect(product.price).toBe(123);
    });

    it("Should throw an error when creating a product without id", () => {
        expect(() => {
            ProductFixture.create({
                id: "",
            });
        }).toThrow("Id is required.");
    });

    it("Should throw an error when creating a product without id", () => {
        expect(() => {
            ProductFixture.create({
                name: "",
            });
        }).toThrow("Name is required.");
    });

    it("Should throw an error when creating a product without id", () => {
        expect(() => {
            ProductFixture.create({
                price: 0,
            });
        }).toThrow("Price price is required to be greater than zero");
    });
});