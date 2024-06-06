import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";

export default interface InvoiceGateway {
    find(id: string): Promise<Invoice>;
    generate(input: Invoice): Promise<void>;
}
