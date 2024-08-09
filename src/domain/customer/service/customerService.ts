import { v4 as uuid } from "uuid";
import EventDispatcherInterface from "../../shared/event/eventDispatcherInterface";
import CreateCustomerDTO from "../dto/createCustomerDto";
import Customer from "../entity/customer";
import CustomerRepositoryInterface from "../repository/customerRepositoryInterface";
import Address from "../valueObject/address";
import CustomerCreatedEvent from "../event/customerCreatedEvent";
import ChangeAddressDto from "../dto/changeAddressDto";
import CustomerAddressChangedEvent from "../event/customerAddressChangesEvent";

export default class CustomerService {
    protected repository: CustomerRepositoryInterface;

    protected eventDispatcher: EventDispatcherInterface;

    public constructor(
        repository: CustomerRepositoryInterface,
        eventDispatcher: EventDispatcherInterface
    ) {
        this.repository = repository;
        this.eventDispatcher = eventDispatcher;
    }

    public create(dto: CreateCustomerDTO): Customer {
        let address: Address = new Address(
            dto.street,
            dto.number,
            dto.zip,
            dto.city
        );
        let customer: Customer = new Customer(
            uuid(),
            dto.name,
            dto.active,
            address
        );

        this.repository.create(customer);

        this.eventDispatcher.notify(
            new CustomerCreatedEvent({
                id: customer.id,
                name: customer.name
            })
        );


        return customer;
    }

    public changeAddress(customer: Customer, dto: ChangeAddressDto): Customer {
        let newAddress: Address = new Address(
            dto.street,
            dto.number,
            dto.zip,
            dto.city
        );
        customer.changeAddress(newAddress);

        this.repository.update(customer);

        this.eventDispatcher.notify(new CustomerAddressChangedEvent({
            id: customer.id,
            name: customer.name,
            address: customer.address
        }));

        return customer;
    }
}