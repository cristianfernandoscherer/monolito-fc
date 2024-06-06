import Address from "../../../@shared/domain/value-object/address"
import Id from "../../../@shared/domain/value-object/id.value-object"
import InvoiceItems from "../../domain/invoice-items.entity"
import Invoice from "../../domain/invoice.entity"
import GenerateInvoiceUseCase from "./generate-invoice.usecase"

const invoice = {
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

const MockRepository = () => {

    return {
        generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        find: jest.fn()
    }
}

describe("Generate invoice use case unit test", () => {

    it("should generate an invoice", async () => {

        const repository = MockRepository()
        const usecase = new GenerateInvoiceUseCase(repository)

        const result = await usecase.execute(invoice)

        expect(repository.generate).toHaveBeenCalled()
        expect(result.id).toBeDefined()
        expect(result.name).toEqual(invoice.name)
        expect(result.document).toEqual(invoice.document)
        expect(result.street).toBe(invoice.street)
        expect(result.number).toBe(invoice.number)
        expect(result.complement).toBe(invoice.complement)
        expect(result.city).toBe(invoice.city)
        expect(result.state).toBe(invoice.state)
        expect(result.zipCode).toBe(invoice.zipCode)
        expect(result.items[0].id).toBe(invoice.items[0].id)
        expect(result.items[0].name).toBe(invoice.items[0].name)
        expect(result.items[0].price).toBe(invoice.items[0].price)
        expect(result.items[1].id).toBe(invoice.items[1].id)
        expect(result.items[1].name).toBe(invoice.items[1].name)
        expect(result.items[1].price).toBe(invoice.items[1].price)
    })
})