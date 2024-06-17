import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for invoice", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should generate an invoice", async () => {

        const response = await request(app)
            .post("/invoice")
            .send({
                id: "1",
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
            })

        expect(response.status).toBe(200)
    })

    it("should find an invoice", async () => {
        const response = await request(app)
            .post("/invoice")
            .send({
                id: "1",
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
            })

        expect(response.status).toBe(200)

        const invoiceResponse = await request(app).get("/invoice/1").send();

        expect(invoiceResponse.status).toBe(200);
        expect(invoiceResponse.body.id).toBe("1");
        expect(invoiceResponse.body.name).toBe("Teste");
        expect(invoiceResponse.body.document).toBe("123456");
        expect(invoiceResponse.body.address.street).toBe("teste");
        expect(invoiceResponse.body.address.number).toBe("123");
        expect(invoiceResponse.body.address.complement).toBe("teste");
        expect(invoiceResponse.body.address.city).toBe("teste");
        expect(invoiceResponse.body.address.state).toBe("teste");
        expect(invoiceResponse.body.address.zipCode).toBe("123456");
        expect(invoiceResponse.body.items[0].id).toBe("1");
        expect(invoiceResponse.body.items[0].name).toBe("Teste");
        expect(invoiceResponse.body.items[0].price).toBe(100);
        expect(invoiceResponse.body.items[1].id).toBe("2");
        expect(invoiceResponse.body.items[1].name).toBe("Teste");
        expect(invoiceResponse.body.items[1].price).toBe(90);
    });
})