import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../model/customerModel";
import CustomerFixture from "../../../../domain/customer/entity/customerFixture";
import CustomerRepository from "./customerRepository";
import Customer from "../../../../domain/customer/entity/customer";

describe("Customer Repository testes", () => {

    let sequelize: Sequelize;
    let customerRepository: CustomerRepository;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([CustomerModel])
        await sequelize.sync();

        customerRepository = new CustomerRepository();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a customer", async () => {
        let customerEntity = CustomerFixture.create();

        await customerRepository.create(customerEntity);

        let customerModel = await CustomerModel.findOne({
            where: { id: customerEntity.id }
        });

        expect(customerModel.id).toBe(customerEntity.id);
        expect(customerModel.name).toBe(customerEntity.name);
        expect(customerModel.active).toBe(customerEntity.isActive);
        expect(customerModel.rewardPoints).toBe(customerEntity.rewardPoints);
        expect(customerModel.street).toBe(customerEntity.address.street);
        expect(customerModel.number).toBe(customerEntity.address.number);
        expect(customerModel.zip).toBe(customerEntity.address.zip);
        expect(customerModel.city).toBe(customerEntity.address.city);
    });

    it("Should update a customer", async () => {
        let customerEntity = CustomerFixture.create();

        customerRepository.create(customerEntity);

        customerEntity.addRewardPoints(100);
        customerEntity.changeName("Teste change name");

        await customerRepository.update(customerEntity);

        let customerModel = await CustomerModel.findOne({
            where: { id: customerEntity.id }
        });

        expect(customerModel.id).toBe(customerEntity.id);
        expect(customerModel.name).toBe(customerEntity.name);
        expect(customerModel.active).toBe(customerEntity.isActive);
        expect(customerModel.rewardPoints).toBe(customerEntity.rewardPoints);
        expect(customerModel.street).toBe(customerEntity.address.street);
        expect(customerModel.number).toBe(customerEntity.address.number);
        expect(customerModel.zip).toBe(customerEntity.address.zip);
        expect(customerModel.city).toBe(customerEntity.address.city);
    });

    it("Should find a customer", async () => {
        let customerEntity = CustomerFixture.create();

        await customerRepository.create(customerEntity);

        let customerEntityFound = await customerRepository.find(customerEntity.id);

        expect(customerEntityFound.id).toBe(customerEntity.id);
        expect(customerEntityFound.name).toBe(customerEntity.name);
        expect(customerEntityFound.isActive).toBe(customerEntity.isActive);
        expect(customerEntityFound.rewardPoints).toBe(customerEntity.rewardPoints);
        expect(customerEntityFound.address.street).toBe(customerEntity.address.street);
        expect(customerEntityFound.address.number).toBe(customerEntity.address.number);
        expect(customerEntityFound.address.zip).toBe(customerEntity.address.zip);
        expect(customerEntityFound.address.city).toBe(customerEntity.address.city);
    });



    it("Should find a customer", async () => {
        let customerEntity = CustomerFixture.create();

        await customerRepository.create(customerEntity);

        let customerEntityFound = await customerRepository.find(customerEntity.id);

        expect(customerEntityFound.id).toBe(customerEntity.id);
        expect(customerEntityFound.name).toBe(customerEntity.name);
        expect(customerEntityFound.isActive).toBe(customerEntity.isActive);
        expect(customerEntityFound.rewardPoints).toBe(customerEntity.rewardPoints);
        expect(customerEntityFound.address.street).toBe(customerEntity.address.street);
        expect(customerEntityFound.address.number).toBe(customerEntity.address.number);
        expect(customerEntityFound.address.zip).toBe(customerEntity.address.zip);
        expect(customerEntityFound.address.city).toBe(customerEntity.address.city);
    });

    it("Should find all", async () => {
        let customers = [
            CustomerFixture.create(),
            CustomerFixture.create(),
            CustomerFixture.create(),
        ];

        customers.forEach(async (product: Customer) => {
            await customerRepository.create(product);
        });

        let customersFound = await customerRepository.findAll();

        expect(customersFound.length).toStrictEqual(3);
    });

});