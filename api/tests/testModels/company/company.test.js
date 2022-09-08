import request from "supertest";
import app from "../../appTest.js";

describe("GET ALL /company", () => {
    it("responds with json", async () => {
        const response = await request(app)
            .get("/api/company")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);
        expect(response.statusCode).toBe(200);

        for (const oneCompany of response.body) {
            expect(oneCompany).toMatchSnapshot({
                name: expect.stringMatching(/[a-zA-Z]/),
                phone_number: expect.stringMatching(/[0-9]{8,9}/)
            });
        }
    });
});
