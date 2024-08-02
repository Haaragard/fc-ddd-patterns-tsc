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

    it("Should change name", () => {
        let product = ProductFixture.create({
            name: "Base name"
        });

        product.changeName("New name");

        expect(product.name).toBe("New name");
    });

    it("Should throw error when change name receives nothing", () => {
        let product = ProductFixture.create({
            name: "Base name"
        });

        expect(() => {
            product.changeName("");
        }).toThrow("New name can't be empty");
    });

    it("Should change price", () => {
        let product = ProductFixture.create({
            price: 10
        });

        product.changePrice(40);

        expect(product.price).toBe(40);
    });

    it("Should throw error when change price zero or below", () => {
        let product = ProductFixture.create({
            price: 10
        });

        expect(() => {
            product.changePrice(0);
        }).toThrow("New amount should be greater than zero");
    });
});