import EventDispatcherInterface from "../../shared/event/eventDispatcherInterface";
import ChangeAddressDto from "../dto/changeAddressDto";
import CreateCustomerDTO from "../dto/createCustomerDto";
import Customer from "../entity/customer";
import CustomerFixture from "../entity/customerFixture";
import CustomerAddressChangedEvent from "../event/customerAddressChangesEvent";
import CustomerRepositoryInterface from "../repository/customerRepositoryInterface";
import Address from "../valueObject/address";
import CustomerService from "./customerService";


describe("Customer Service unit tests", () => {

    jest.mock("../repository/customerRepositoryInterface");
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

        expect(customer.name).toStrictEqual(createCustomerDto.name);
        expect(customer.isActive).toStrictEqual(createCustomerDto.active);
        expect(customer.address.street).toStrictEqual(createCustomerDto.street);
        expect(customer.address.number).toStrictEqual(createCustomerDto.number);
        expect(customer.address.zip).toStrictEqual(createCustomerDto.zip);
        expect(customer.address.city).toStrictEqual(createCustomerDto.city);
    });

    it("Should change a costumer address", () => {
        let customer: Customer = CustomerFixture.create();
        let changeAddressDto = new ChangeAddressDto(
            "Street name new",
            12344,
            "zip code new",
            "City new"
        );

        customer = service.changeAddress(customer, changeAddressDto);

        expect(mockRepository.update).toHaveBeenCalledWith(customer);
        expect(mockEventDispatcher.notify).toHaveBeenCalledWith(new CustomerAddressChangedEvent({
            id: customer.id,
            name: customer.name,
            address: customer.address
        }));

        expect(customer.address.street).toStrictEqual(changeAddressDto.street);
        expect(customer.address.number).toStrictEqual(changeAddressDto.number);
        expect(customer.address.zip).toStrictEqual(changeAddressDto.zip);
        expect(customer.address.city).toStrictEqual(changeAddressDto.city);
    });
});