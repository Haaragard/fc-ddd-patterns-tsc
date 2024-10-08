import Product from "../../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../../domain/product/repository/productRepositoryInterface";
import ProductModel from "../model/productModel";

export default class ProductRepository implements ProductRepositoryInterface {
    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        });
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update(
            {
                name: entity.name,
                price: entity.price,
            },
            {
                where: {
                    id: entity.id,
                },
            }
        );
    }

    async find(id: string): Promise<Product> {
        let productFound = await ProductModel.findOne({
            where: { id: id }
        });

        return new Product(
            productFound.id,
            productFound.name,
            productFound.price
        );
    }

    async findAll(): Promise<Product[]> {
        let productModels = await ProductModel.findAll();

        return productModels.map(
            (productModel: ProductModel) =>
                new Product(
                    productModel.id,
                    productModel.name,
                    productModel.price
                )
        );
    }
}