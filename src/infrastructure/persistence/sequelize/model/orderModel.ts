import { AllowNull, BelongsTo, Column, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import CustomerModel from "./customerModel";
import OrderItemModel from "./orderItemModel";

@Table({ tableName: "orders", timestamps: false })
export default class OrderModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;

    @AllowNull(false)
    @ForeignKey(() => CustomerModel)
    @Column
    declare customer_id: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(() => OrderItemModel)
    declare items: OrderItemModel[];

    @AllowNull(false)
    @Column
    declare total: number;
}