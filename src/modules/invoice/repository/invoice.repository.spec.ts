import { CreatedAt, Sequelize } from "sequelize-typescript"
import Invoice from "../domain/invoice.entity";
import { InvoiceModel } from "./invoice.model";
import { InvoiceItemsModel } from "./invoice-items.models";
import InvoiceRepository from "./invoice.repository";
import InvoiceItems from "../domain/invoice-items.entity";
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("InvoiceRepository", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([InvoiceModel, InvoiceItemsModel])
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find an invoice", async () => {
        const invoice = await InvoiceModel.create({
            id: "1",
            name: "invoice",
            document: "123456",
            street: "rua santo antonio",
            number: "123",
            complement: "complement",
            city: "sao paulo",
            state: "SP",
            zipcode: "123456",
            items: [
                {
                    id: "1",
                    name: "item",
                    price: 100,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    id: "2",
                    name: "item2",
                    price: 200,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        }, { include: [InvoiceItemsModel] })

        const invoiceRepository = new InvoiceRepository()
        const result = await invoiceRepository.find(invoice.id)

        expect(result.id.id).toEqual(invoice.id)
        expect(result.name).toBe(invoice.name)
        expect(result.document).toBe(invoice.document)
        expect(result.address.street).toBe(invoice.street)
        expect(result.address.number).toBe(invoice.number)
        expect(result.address.complement).toBe(invoice.complement)
        expect(result.address.city).toBe(invoice.city)
        expect(result.address.state).toBe(invoice.state)
        expect(result.address.zipCode).toBe(invoice.zipcode)
        expect(result.items[0].id.id).toBe(invoice.items[0].id)
        expect(result.items[0].name).toBe(invoice.items[0].name)
        expect(result.items[0].price).toBe(invoice.items[0].price)
        expect(result.items[1].id.id).toBe(invoice.items[1].id)
        expect(result.items[1].name).toBe(invoice.items[1].name)
        expect(result.items[1].price).toBe(invoice.items[1].price)
    })

    it("should genarate an invoice", async () => {
        const invoice = new Invoice({
            id: new Id("1"),
            name: "invoice",
            document: "123456",
            address: new Address(
                "rua santo antonio",
                "123",
                "complement",
                "sao paulo",
                "SP",
                "123456"
            ), items: [
                new InvoiceItems({
                    id: new Id("1"),
                    name: "item",
                    price: 100,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }),
                new InvoiceItems({
                    id: new Id("2"),
                    name: "item2",
                    price: 200,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const invoiceRepository = new InvoiceRepository()
        await invoiceRepository.generate(invoice)

        const result = await InvoiceModel.findOne({ where: { id: "1" }, include: ["items"] })

        console.log("resulttttttttt");
        console.log(result)
        expect(result.id).toBeDefined()
        expect(result.name).toEqual(invoice.name)
        expect(result.document).toEqual(invoice.document)
        expect(result.street).toBe(invoice.address.street)
        expect(result.number).toBe(invoice.address.number)
        expect(result.complement).toBe(invoice.address.complement)
        expect(result.city).toBe(invoice.address.city)
        expect(result.state).toBe(invoice.address.state)
        expect(result.zipcode).toBe(invoice.address.zipCode)
        expect(result.items[0].id).not.toBeNull()
        expect(result.items[0].name).toBe(invoice.items[0].name)
        expect(result.items[0].price).toBe(invoice.items[0].price)
        expect(result.items[1].id).not.toBeNull()
        expect(result.items[1].name).toBe(invoice.items[1].name)
        expect(result.items[1].price).toBe(invoice.items[1].price)
    })
})