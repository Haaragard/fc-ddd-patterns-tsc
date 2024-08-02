import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customerRepositoryInterface";
import Address from "../../../../domain/customer/valueObject/address";
import CustomerModel from "../model/customerModel";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zip: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive,
            rewardPoints: entity.rewardPoints
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zip: entity.address.zip,
                city: entity.address.city,
                active: entity.isActive,
                rewardPoints: entity.rewardPoints
            },
            {
                where: { id: entity.id }
            }
        );
    }

    async find(id: string): Promise<Customer> {
        let customerModel = await CustomerModel.findOne({
            where: { id: id }
        });

        let address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zip,
            customerModel.city
        );

        let customer = new Customer(
            customerModel.id,
            customerModel.name,
            customerModel.active,
            address
        );

        customer.rewardPoints = customerModel.rewardPoints;

        return customer;
    }

    async findAll(): Promise<Customer[]> {
        let customerModels = await CustomerModel.findAll();

        return customerModels.map(
            (customerModel: CustomerModel) => {
                let address = new Address(
                    customerModel.street,
                    customerModel.number,
                    customerModel.zip,
                    customerModel.city
                );
        
                let customer = new Customer(
                    customerModel.id,
                    customerModel.name,
                    customerModel.active,
                    address
                );
        
                customer.rewardPoints = customerModel.rewardPoints;

                return customer;
            }
        );
    }
}