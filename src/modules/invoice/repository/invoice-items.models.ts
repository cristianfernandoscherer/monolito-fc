import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Table } from "sequelize-typescript";
import Invoice from "../domain/invoice.entity";
import { InvoiceModel } from "./invoice.model";

@Table({
    tableName: 'invoice_items',
    timestamps: false
})
export class InvoiceItemsModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string

    @Column({ allowNull: false })
    name: string

    @Column({ allowNull: false })
    price: number

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: true, type: DataType.STRING })
    invoiceId: String;

    @Column({ allowNull: false })
    createdAt: Date

    @Column({ allowNull: false })
    updatedAt: Date
}