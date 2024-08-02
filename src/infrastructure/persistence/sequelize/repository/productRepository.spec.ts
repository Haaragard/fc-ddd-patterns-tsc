
import ProductRepository from "./productRepository";
import ProductFixture from "../../../../domain/product/entity/productFixture";
import { Sequelize } from "sequelize-typescript";
import ProductModel from "../model/productModel";
import Product from "../../../../domain/product/entity/product";

describe("Product repository tests", () => {

    let sequelize: Sequelize;
    let productRepository: ProductRepository;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([ProductModel])
        await sequelize.sync();

        productRepository = new ProductRepository();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a product", async () => {
        let productRepository = new ProductRepository();
        let product = ProductFixture.create({ id: "1" });

        await productRepository.create(product);

        let productModel = await ProductModel.findOne({
            where: { id: "1" }
        });

        expect(productModel.id).toStrictEqual(product.id);
        expect(productModel.name).toStrictEqual(product.name);
        expect(productModel.price).toStrictEqual(product.price);
    });

    it("Should update a product", async () => {
        let productRepository = new ProductRepository();
        let product = ProductFixture.create({ id: "1" });

        await productRepository.create(product);

        product.changeName("Teste update name");
        product.changePrice(2000);

        await productRepository.update(product);

        let productModel = await ProductModel.findOne({
            where: { id: "1" }
        });

        expect(productModel.price).toStrictEqual(2000);
    });

    it("Should find a product", async () => {
        let productRepository = new ProductRepository();
        let product = ProductFixture.create();

        await productRepository.create(product);

        let productFound = await productRepository.find(product.id);

        expect(productFound.id).toStrictEqual(product.id);
        expect(productFound.name).toStrictEqual(product.name);
        expect(productFound.price).toStrictEqual(product.price);
    });

    it("Should find all", async () => {
        let productRepository = new ProductRepository();
        let products = [
            ProductFixture.create(),
            ProductFixture.create(),
            ProductFixture.create(),
        ];

        products.forEach(async (product: Product) => {
            await productRepository.create(product);
        });

        let productsFound = await productRepository.findAll();

        expect(productsFound.length).toStrictEqual(3);
    });

});