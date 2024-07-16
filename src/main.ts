import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/valueObject/address";
import OrderItem from "./domain/order/entity/item";
import Order from "./domain/order/entity/order";

let address = new Address(
    "Nome Rua",
    123,
    "131313123",
    "City Name"
);
let customer = new Customer(
    "customer-id-123123123",
    "Customer Name",
    address,
    false
);
customer.activate();

let item1 = new OrderItem(
    "order-item-id-1-123123123",
    "Item Name 1",
    10
);
let item2 = new OrderItem(
    "order-item-id-2-123123123",
    "Item Name 2",
    15
);

let order = new Order(
    "order-id-1-123123123",
    customer.id,
    [item1, item2]
);