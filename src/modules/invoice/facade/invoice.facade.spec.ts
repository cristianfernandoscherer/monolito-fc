import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "../repository/invoice.model"
import { InvoiceItemsModel } from "../repository/invoice-items.models"
import InvoiceRepository from "../repository/invoice.repository"
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase"
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase"
import InvoiceFacade from "./invoice.facade"
import InvoiceFacadeFactory from "../factory/invoice.facade.factory"


describe("Invoice Facade test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([InvoiceModel, InvoiceItemsModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it("should find an invoice", async () => {

        const facade = InvoiceFacadeFactory.create()

        const input = {
            id: "1",
            name: "Teste",
            document: "123456",
            street: "teste",
            number: "123",
            complement: "teste",
            city: "teste",
            state: "teste",
            zipCode: "123456",
            items: [
                {
                    id: "1",
                    name: "Teste",
                    price: 100
                },
                {
                    id: "2",
                    name: "Teste",
                    price: 90
                }
            ]
        };

        await facade.generate(input)

        const invoice = await InvoiceModel.findOne({ where: { id: "1" }, include: ["items"] })
        console.log(invoice)
        expect(invoice.id).toBeDefined()
        expect(invoice.name).toEqual(invoice.name)
        expect(invoice.document).toEqual(invoice.document)
        expect(invoice.street).toBe(invoice.street)
        expect(invoice.number).toBe(invoice.number)
        expect(invoice.complement).toBe(invoice.complement)
        expect(invoice.city).toBe(invoice.city)
        expect(invoice.state).toBe(invoice.state)
        expect(invoice.zipcode).toBe(invoice.zipcode)
        expect(invoice.items[0].id).not.toBeNull()
        expect(invoice.items[0].name).toBe(invoice.items[0].name)
        expect(invoice.items[0].price).toBe(invoice.items[0].price)
        expect(invoice.items[1].id).not.toBeNull()
        expect(invoice.items[1].name).toBe(invoice.items[1].name)
        expect(invoice.items[1].price).toBe(invoice.items[1].price)
    })

    it("should generate an invoice", async () => {

        const facade = InvoiceFacadeFactory.create()

        const invoice = {
            id: "1",
            name: "Teste",
            document: "123456",
            street: "teste",
            number: "123",
            complement: "teste",
            city: "teste",
            state: "teste",
            zipCode: "123456",
            items: [
                {
                    id: "1",
                    name: "Teste",
                    price: 100
                },
                {
                    id: "2",
                    name: "Teste",
                    price: 90
                }
            ]
        };

        await facade.generate(invoice)

        const client = await facade.find({ id: "1" })
        console.log("client");
        console.log(client);
        expect(client.id).toBeDefined()
        expect(client.name).toEqual(invoice.name)
        expect(client.document).toEqual(invoice.document)
        expect(client.address.street).toEqual(invoice.street)
        expect(client.address.number).toBe(invoice.number)
        expect(client.address.complement).toBe(invoice.complement)
        expect(client.address.city).toBe(invoice.city)
        expect(client.address.state).toBe(invoice.state)
        expect(client.address.zipCode).toBe(invoice.zipCode)
        expect(client.items[0].id).toBe(invoice.items[0].id)
        expect(client.items[0].name).toBe(invoice.items[0].name)
        expect(client.items[0].price).toBe(invoice.items[0].price)
        expect(client.items[1].id).toBe(invoice.items[1].id)
        expect(client.items[1].name).toBe(invoice.items[1].name)
        expect(client.items[1].price).toBe(invoice.items[1].price)
    })
})