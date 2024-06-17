import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
import ClientAdmFacadeFactory from "../../modules/client-adm/factory/client-adm.facade.factory";
import Address from "../../modules/@shared/domain/value-object/address";
import PaymentFacadeFactory from "../../modules/payment/factory/payment.facade.factory";
export const checkoutRoute = express.Router();

checkoutRoute.post("/", async (req: Request, res: Response) => {
    const paymentFacadeFactory = PaymentFacadeFactory.create();

    try {
        const paymentDto = {
            orderId: req.body.orderId,
            amount: req.body.amount
        };

        const output = await paymentFacadeFactory.process(paymentDto);
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});
