import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import Address from "../../modules/@shared/domain/value-object/address";
export const clientRoute = express.Router();

clientRoute.post("/", async (req: Request, res: Response) => {
    const clientFacadeFactory = ClientAdmFacadeFactory.create();

    try {
        const clientDto = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            document: req.body.document,
            address: new Address(
                req.body.street,
                req.body.number,
                req.body.complement,
                req.body.city,
                req.body.state,
                req.body.zipCode
            )
        };

        const output = await clientFacadeFactory.add(clientDto);
        res.status(201).send({});
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

clientRoute.get("/:id", async (req: Request, res: Response) => {
    const clientFacadeFactory = ClientAdmFacadeFactory.create();
    try {
        const clientDto = {
            id: req.params.id
        };
        const output = await clientFacadeFactory.find(clientDto);
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});