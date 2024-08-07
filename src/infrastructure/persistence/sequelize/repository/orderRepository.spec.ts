import { Sequelize } from "sequelize-typescript";
import OrderRepository from "./orderRepository";
import OrderModel from "../model/orderModel";
import OrderItemModel from "../model/orderItemModel";
import CustomerModel from "../model/customerModel";
import ProductModel from "../model/productModel";
import CustomerFixture from "../../../../domain/customer/entity/customerFixture";
import ProductFixture from "../../../../domain/product/entity/productFixture";
import CustomerRepository from "./customerRepository";
import ProductRepository from "./productRepository";
import OrderItemFixture from "../../../../domain/order/entity/orderItemFixture";
import OrderFixture from "../../../../domain/order/entity/orderFixture";
import Order from "../../../../domain/order/entity/order";
import OrderItem from "../../../../domain/order/entity/orderItem";

describe("Order tests", () => {

    let sequelize: Sequelize;
    let orderRepository: OrderRepository;
    let customerRepository: CustomerRepository;
    let productRepository: ProductRepository;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        });

        sequelize.addModels([
            CustomerModel,
            ProductModel,
            OrderModel,
            OrderItemModel
        ])
        await sequelize.sync();

        orderRepository = new OrderRepository();
        customerRepository = new CustomerRepository();
        productRepository = new ProductRepository();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should create a new order", async () => {
        let customer = CustomerFixture.create();
        await customerRepository.create(customer);

        let product = ProductFixture.create();
        await productRepository.create(product);

        let orderItem = OrderItemFixture.create({
            productId: product.id,
        });
        let order = OrderFixture.create({
            customerId: customer.id,
            items: [orderItem]
        });
        await orderRepository.create(order);

        let orderFound = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items", "customer"]
        });

        expect(orderFound.id).toBe(order.id);
        expect(orderFound.customer_id).toBe(order.customerId);
        expect(orderFound.total).toBe(order.total());

        expect(orderFound.customer.id).toBe(customer.id);
        expect(orderFound.customer.name).toBe(customer.name);
        expect(orderFound.customer.active).toBe(customer.isActive);
        expect(orderFound.customer.street).toBe(customer.address.street);
        expect(orderFound.customer.number).toBe(customer.address.number);
        expect(orderFound.customer.zip).toBe(customer.address.zip);
        expect(orderFound.customer.city).toBe(customer.address.city);

        expect(orderFound.items.length).toBe(order.items.length);
        expect(orderFound.items[0].id).toBe(orderItem.id);
        expect(orderFound.items[0].name).toBe(orderItem.name);
        expect(orderFound.items[0].price).toBe(orderItem.price);
        expect(orderFound.items[0].product_id).toBe(orderItem.productId);
        expect(orderFound.items[0].quantity).toBe(orderItem.quantity);
    });

    it("Should update an order", async () => {
        let customer = CustomerFixture.create();
        await customerRepository.create(customer);

        let product = ProductFixture.create();
        await productRepository.create(product);

        let orderItem = OrderItemFixture.create({
            productId: product.id,
        });
        let order = OrderFixture.create({
            customerId: customer.id,
            items: [orderItem]
        });
        await orderRepository.create(order);

        orderItem.changeQuantity(10);

        await orderRepository.update(order);

        let orderFound = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items", "customer"]
        });

        expect(orderFound.id).toBe(order.id);
        expect(orderFound.customer_id).toBe(order.customerId);
        expect(orderFound.total).toBe(order.total());

        expect(orderFound.customer.id).toBe(customer.id);
        expect(orderFound.customer.name).toBe(customer.name);
        expect(orderFound.customer.active).toBe(customer.isActive);
        expect(orderFound.customer.street).toBe(customer.address.street);
        expect(orderFound.customer.number).toBe(customer.address.number);
        expect(orderFound.customer.zip).toBe(customer.address.zip);
        expect(orderFound.customer.city).toBe(customer.address.city);

        expect(orderFound.items.length).toBe(order.items.length);
        expect(orderFound.items[0].id).toBe(orderItem.id);
        expect(orderFound.items[0].name).toBe(orderItem.name);
        expect(orderFound.items[0].price).toBe(orderItem.price);
        expect(orderFound.items[0].product_id).toBe(orderItem.productId);
        expect(orderFound.items[0].quantity).toBe(orderItem.quantity);
    });

    it("Should find an order", async () => {
        let customer = CustomerFixture.create();
        await customerRepository.create(customer);

        let product = ProductFixture.create();
        await productRepository.create(product);

        let orderItem = OrderItemFixture.create({
            productId: product.id,
        });
        let order = OrderFixture.create({
            customerId: customer.id,
            items: [orderItem]
        });
        await orderRepository.create(order);

        let orderFound = await orderRepository.find(order.id);

        expect(orderFound).toBeInstanceOf(Order);
        expect(orderFound.id).toBe(order.id);
        expect(orderFound.customerId).toBe(order.customerId);
        expect(orderFound.total()).toBe(order.total());

        expect(orderFound.items.length).toBe(order.items.length);
        expect(orderFound.items[0]).toBeInstanceOf(OrderItem);
        expect(orderFound.items[0].id).toBe(orderItem.id);
        expect(orderFound.items[0].name).toBe(orderItem.name);
        expect(orderFound.items[0].price).toBe(orderItem.price);
        expect(orderFound.items[0].productId).toBe(orderItem.productId);
        expect(orderFound.items[0].quantity).toBe(orderItem.quantity);
    });

    it("Should find all orders", async () => {
        let customer = CustomerFixture.create();
        await customerRepository.create(customer);

        let product = ProductFixture.create();
        await productRepository.create(product);

        let orderItem = OrderItemFixture.create({
            productId: product.id,
        });
        let order = OrderFixture.create({
            customerId: customer.id,
            items: [orderItem]
        });
        await orderRepository.create(order);

        let orderItem2 = OrderItemFixture.create({
            productId: product.id,
        });
        let order2 = OrderFixture.create({
            customerId: customer.id,
            items: [orderItem2]
        });
        await orderRepository.create(order2);

        let ordersFound = await orderRepository.findAll();

        expect(ordersFound.length).toBe(2);

        expect(ordersFound[0]).toBeInstanceOf(Order);
        expect(ordersFound[0].id).toBe(order.id);
        expect(ordersFound[0].customerId).toBe(order.customerId);
        expect(ordersFound[0].total()).toBe(order.total());

        expect(ordersFound[0].items.length).toBe(order.items.length);
        expect(ordersFound[0].items[0]).toBeInstanceOf(OrderItem);
        expect(ordersFound[0].items[0].id).toBe(orderItem.id);
        expect(ordersFound[0].items[0].name).toBe(orderItem.name);
        expect(ordersFound[0].items[0].price).toBe(orderItem.price);
        expect(ordersFound[0].items[0].productId).toBe(orderItem.productId);
        expect(ordersFound[0].items[0].quantity).toBe(orderItem.quantity);

        expect(ordersFound[1]).toBeInstanceOf(Order);
        expect(ordersFound[1].id).toBe(order2.id);
        expect(ordersFound[1].customerId).toBe(order2.customerId);
        expect(ordersFound[1].total()).toBe(order2.total());

        expect(ordersFound[1].items.length).toBe(order2.items.length);
        expect(ordersFound[1].items[0]).toBeInstanceOf(OrderItem);
        expect(ordersFound[1].items[0].id).toBe(orderItem2.id);
        expect(ordersFound[1].items[0].name).toBe(orderItem2.name);
        expect(ordersFound[1].items[0].price).toBe(orderItem2.price);
        expect(ordersFound[1].items[0].productId).toBe(orderItem2.productId);
        expect(ordersFound[1].items[0].quantity).toBe(orderItem2.quantity);
    });

});