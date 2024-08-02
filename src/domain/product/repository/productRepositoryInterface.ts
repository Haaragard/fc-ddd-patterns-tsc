import RepositoryInterface from "../../shared/repositoryInterface";
import Product from "../entity/product";

export default interface ProductRepositoryInterface
    extends RepositoryInterface<Product> {}