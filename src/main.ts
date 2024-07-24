import Customer from "./domain/customer/entity/customer";
import Address from "./domain/customer/valueObject/address";
import OrderItem from "./domain/order/entity/orderItem";
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
    false,
    address
);
customer.activate();

let item1 = new OrderItem(
    "order-item-id-1",
    "product-id-1",
    "Item Name 1",
    10,
    100
);
let item2 = new OrderItem(
    "order-item-id-2",
    "product-id-2",
    "Item Name 2",
    15,
    200
);

let order = new Order(
    "order-id-1-123123123",
    customer.id,
    [item1, item2]
);