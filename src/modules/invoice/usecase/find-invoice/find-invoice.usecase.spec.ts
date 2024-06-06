import Address from "../../../@shared/domain/value-object/address"
import Id from "../../../@shared/domain/value-object/id.value-object"
import InvoiceItems from "../../domain/invoice-items.entity"
import Invoice from "../../domain/invoice.entity"
import FindInvoiceUseCase from "./find-invoice.usecase"

const invoice = new Invoice({
    id: new Id("1"),
    name: "Lucian",
    document: "123456",
    address: new Address(
        "Street",
        "123",
        "Complement",
        "City",
        "State",
        "ZipCode",
    ),
    items: [
        new InvoiceItems({
            id: new Id("1"),
            name: "Item 1",
            price: 100
        }),
        new InvoiceItems({
            id: new Id("2"),
            name: "Item 2",
            price: 90
        }),
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
})

const MockRepository = () => {

    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice))
    }
}

describe("Find Invoice use case unit test", () => {

    it("should find an invoice", async () => {

        const repository = MockRepository()
        const usecase = new FindInvoiceUseCase(repository)

        const input = {
            id: "1"
        }

        const result = await usecase.execute(input)

        expect(repository.find).toHaveBeenCalled()
        expect(result.id).toEqual(input.id)
        expect(result.name).toEqual(invoice.name)
        expect(result.address.city).toEqual(invoice.address.city)
        expect(result.address.complement).toEqual(invoice.address.complement)
        expect(result.address.number).toEqual(invoice.address.number)
        expect(result.address.state).toEqual(invoice.address.state)
        expect(result.address.street).toEqual(invoice.address.street)
        expect(result.address.zipCode).toEqual(invoice.address.zipCode)
        expect(result.createdAt).toEqual(invoice.createdAt)
        expect(result.items).toHaveLength(2)
        expect(result.total).toEqual(190)
    })
})