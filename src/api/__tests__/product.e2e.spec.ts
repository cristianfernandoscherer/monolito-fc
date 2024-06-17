import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a product", async () => {

        const response = await request(app)
            .post("/product")
            .send({
                name: "Product 1",
                price: 10,
                description: "Product 1 description",
                purchasePrice: 9,
                stock: 10
            })

        expect(response.status).toBe(201)
    })

    it("should verify stock", async () => {
        const response = await request(app)
            .post("/product")
            .send({
                id: '1',
                name: "Product 1",
                price: 10,
                description: "Product 1 description",
                purchasePrice: 9,
                stock: 10
            })

        expect(response.status).toBe(201)

        const productResponse = await request(app).get("/product/1").send();

        expect(productResponse.status).toBe(200);
        expect(productResponse.body.stock).toBe(10);
    });
})