import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for checkout", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("process payment", async () => {

        const response = await request(app)
            .post("/checkout")
            .send({
                orderId: "order-1",
                amount: 100,
            })
        expect(response.status).toBe(200)
        expect(response.body.orderId).toBe("order-1")
        expect(response.body.amount).toBe(100)
        expect(response.body.status).toBe("approved")
    })
})