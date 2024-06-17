import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it("should create a client", async () => {

        const response = await request(app)
            .post("/client")
            .send({
                name: "Client 1",
                email: "a@a.com",
                document: "12345678910",
                street: "Street",
                number: "123",
                complement: "Complement",
                city: "City",
                state: "State",
                zipCode: "12345678"
            })

        expect(response.status).toBe(201)
    })

    it("should verify client", async () => {
        const response = await request(app)
            .post("/client")
            .send({
                id: '1',
                name: "Client 1",
                email: "a@a.com",
                document: "12345678910",
                street: "Street",
                number: "123",
                complement: "Complement",
                city: "City",
                state: "State",
                zipCode: "12345678"
            })

        expect(response.status).toBe(201)

        const clientResponse = await request(app).get("/client/1").send();
        console.log(clientResponse.body);
        expect(clientResponse.status).toBe(200);
        expect(clientResponse.body.id).toBe("1");
        expect(clientResponse.body.name).toBe("Client 1");
        expect(clientResponse.body.email).toBe("a@a.com");
        expect(clientResponse.body.document).toBe("12345678910");
    });
})