
import Order from "../../../../domain/order/entity/order";
import OrderItem from "../../../../domain/order/entity/orderItem";
import OrderRepositoryInterface from "../../../../domain/order/repository/orderRepositoryInterface";
import OrderItemModel from "../model/orderItemModel";
import OrderModel from "../model/orderModel";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((itemEntity: OrderItem) => ({
                    id: itemEntity.id,
                    product_id: itemEntity.productId,
                    quantity: itemEntity.quantity,
                    name: itemEntity.name,
                    price: itemEntity.price
                }))
            },
            {
                include: [{ model: OrderItemModel }]
            }
        );
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.sequelize.transaction(async () => {
            entity.items.forEach(async (itemEntity: OrderItem) => {
                await OrderItemModel.update(
                    {
                        id: itemEntity.id,
                        product_id: itemEntity.productId,
                        quantity: itemEntity.quantity,
                        name: itemEntity.name,
                        price: itemEntity.price
                    },
                    {
                        where: { id: itemEntity.id }
                    }
                )
            });
    
            await OrderModel.update(
                {
                    customer_id: entity.customerId,
                    total: entity.total(),
                },
                {
                    where: { id: entity.id },
                }
            );
        });
        
    }

    async find(id: string): Promise<Order> {
        let order = await OrderModel.findOne({
            where: { id: id },
            include: ["items"]
        });

        return new Order(
            order.id,
            order.customer_id,
            order.items.map(
                (item: OrderItemModel) =>
                    new OrderItem(
                        item.id,
                        item.product_id,
                        item.name,
                        item.quantity,
                        item.price
                    )
            )
        );
    }

    async findAll(): Promise<Order[]> {
        let orders = await OrderModel.findAll({
            include: ["items"]
        });

        return orders.map(
            (order: OrderModel) =>
                new Order(
                    order.id,
                    order.customer_id,
                    order.items.map(
                        (item: OrderItemModel) =>
                            new OrderItem(
                                item.id,
                                item.product_id,
                                item.name,
                                item.quantity,
                                item.price
                            )
                    )
                )
        );
    }
}