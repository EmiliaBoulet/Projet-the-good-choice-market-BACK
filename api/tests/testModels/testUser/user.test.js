import request from "supertest";
import app from "../../appTest.js";

describe("POST /user/login", () => {
    it("response login is confirm", async () => {
        const response = await request(app).post("/api/user/login").send({
            email: "pasparla@wanadoo.fr",
            password: "12345Aa!"
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("user connecté")
    });
});
