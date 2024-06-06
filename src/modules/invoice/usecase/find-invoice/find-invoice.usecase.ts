
import Address from "../../../@shared/domain/value-object/address";
import InvoiceItems from "../../domain/invoice-items.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceInputDto, FindInvoiceOutputDto } from "./find-invoice.dto";

export default class FindInvoiceUseCase {

    private _invoiceRepository: InvoiceGateway

    constructor(invoiceRepository: InvoiceGateway) {
        this._invoiceRepository = invoiceRepository
    }

    async execute(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDto> {

        const result = await this._invoiceRepository.find(input.id)

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            address: {
                street: result.address.street,
                number: result.address.number,
                complement: result.address.complement,
                city: result.address.city,
                state: result.address.state,
                zipCode: result.address.zipCode,
            },
            items: result.items.map(
                (item: InvoiceItems) => {
                    return {
                        id: item.id.id,
                        name: item.name,
                        price: item.price
                    }
                }
            ),
            total: result.items.reduce((sum, current) => sum + current.price, 0),
            createdAt: result.createdAt
        }
    }
}