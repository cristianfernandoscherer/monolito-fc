import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../modules/product-adm/factory/facade.factory";
export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const productFacadeFactory = ProductAdmFacadeFactory.create();

    try {
        const productDto = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.price,
            stock: req.body.stock
        };
        const output = await productFacadeFactory.addProduct(productDto);
        res.status(201).send({});
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/:id", async (req: Request, res: Response) => {
    const productFacadeFactory = ProductAdmFacadeFactory.create();
    try {
        const productDto = {
            productId: req.params.id
        };
        const output = await productFacadeFactory.checkStock(productDto);
        res.status(200).send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});
