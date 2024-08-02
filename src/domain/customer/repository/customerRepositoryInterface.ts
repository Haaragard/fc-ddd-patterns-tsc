import RepositoryInterface from "../../shared/repositoryInterface";
import Customer from "../entity/customer";

export default interface CustomerRepositoryInterface
    extends RepositoryInterface<Customer> {}