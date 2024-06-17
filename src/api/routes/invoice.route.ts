import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import Address from "../../modules/@shared/domain/value-object/address";
import InvoiceFacadeFactory from "../../modules/invoice/factory/invoice.facade.factory";
export const invoiceRoute = express.Router();

invoiceRoute.post("/", async (req: Request, res: Response) => {
    const invoiceFacadeFactory = InvoiceFacadeFactory.create();

    try {
        const invoiceDto = {
            id: req.body.id,
            name: req.body.name,
            document: req.body.document,
            street: req.body.street,
            number: req.body.number,
            complement: req.body.complement,
            city: req.body.city,
            state: req.body.state,
            zipCode: req.body.zipCode,
            items: req.body.items
        };

        const output = await invoiceFacadeFactory.generate(invoiceDto);
        res.status(200).send({});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});


invoiceRoute.get("/:id", async (req: Request, res: Response) => {
    const invoiceFacadeFactory = InvoiceFacadeFactory.create();
    try {
        const invoiceDto = {
            id: req.params.id
        };
        const output = await invoiceFacadeFactory.find(invoiceDto);
        res.status(200).send(output);
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
});