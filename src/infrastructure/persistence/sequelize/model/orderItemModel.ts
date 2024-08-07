import { AllowNull, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import OrderModel from "./orderModel";
import ProductModel from "./productModel";

@Table({ tableName: "order_items", timestamps: false })
export default class OrderItemModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    @AllowNull(false)
    @Column
    declare product_id: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @AllowNull(false)
    @Column
    declare order_id: string;

    @BelongsTo(() => OrderModel)
    declare order: OrderModel;

    @AllowNull(false)
    @Column
    declare quantity: number;

    @AllowNull(false)
    @Column
    declare name: string;

    @AllowNull(false)
    @Column
    declare price: number;
}