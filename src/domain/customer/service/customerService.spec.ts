import EventDispatcherInterface from "../../shared/event/eventDispatcherInterface";
import CreateCustomerDTO from "../dto/createCustomerDto";
import Customer from "../entity/customer";
import CustomerRepositoryInterface from "../repository/customerRepositoryInterface";
import CustomerService from "./customerService";

describe("Customer Service unit tests", () => {

    jest.mock("../../../infrastructure/persistence/sequelize/repository/customerRepositoryInterface");
    let mockRepository: jest.Mocked<CustomerRepositoryInterface> = {
        create: jest.fn(),
        update: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn()
    };

    jest.mock("../../shared/event/eventDispatcherInterface");
    let mockEventDispatcher: jest.Mocked<EventDispatcherInterface> = {
        register: jest.fn(),
        unregister: jest.fn(),
        unregisterAll: jest.fn(),
        notify: jest.fn()
    };

    let service: CustomerService;

    beforeEach(() => {
        jest.resetAllMocks();
        service = new CustomerService(
            mockRepository,
            mockEventDispatcher
        );
    });

    it("Should create a costumer.", () => {
        let createCustomerDto = new CreateCustomerDTO(
            "uuid-name",
            "Customer 1",
            true,
            "Street name",
            123,
            "zip code",
            "City"
        );

        let customer = service.create(createCustomerDto);

        expect(mockRepository.create).toHaveBeenCalledWith(customer);
        expect(mockEventDispatcher.notify).toHaveBeenCalled();

        expect(customer.id).toStrictEqual(createCustomerDto.id);
        expect(customer.name).toStrictEqual(createCustomerDto.name);
        expect(customer.isActive).toStrictEqual(createCustomerDto.active);
        expect(customer.address.street).toStrictEqual(createCustomerDto.street);
        expect(customer.address.number).toStrictEqual(createCustomerDto.number);
        expect(customer.address.zip).toStrictEqual(createCustomerDto.zip);
        expect(customer.address.city).toStrictEqual(createCustomerDto.city);
    });

});