import request from "supertest";
import app from "../../appTest.js";

beforeAll(async () => {
    await request(app).post("/api/user/login").send({
        email: "pasparla@wanadoo.fr",
        password: "12345Aa!"
    });
});

describe("GET ALL /product", () => {
    describe("Check status of response", () => {
        it("response with json", async () => {
            const response = await request(app).get("/api/product");
            expect(response.type).toBe("application/json");
            expect(response.type).not.toBe("application/xml");
        });
        it("response status code 200", async () => {
            const response = await request(app).get("/api/product");
            expect(response.statusCode).toBe(200);
            expect(response.statusCode).not.toBe(404);
            expect(response.statusCode).not.toBe(401);
            expect(response.statusCode).not.toBe(500);
        });
    });

    describe("Check contains of response", () => {
        it("response body contains > 0", async () => {
            const response = await request(app).get("/api/product");
            expect(response.body.length).toBeGreaterThan(0);
        });
    });
});

describe("GET ONE /product", () => {
    const productId = 100;

    describe("Check status of response", () => {
        it("response with json", async () => {
            const response = await request(app).get(`/api/product/${productId}`);
            expect(response.type).toBe("application/json");
        });
        it("response status code 200", async () => {
            const response = await request(app).get(`/api/product/${productId}`);
            expect(response.statusCode).toBe(200);
        });
    });

    describe("Check contains of response", () => {
        it("response body contains > 0", async () => {
            const response = await request(app).get(`/api/product/${productId}`);
            expect(response.body).toMatchSnapshot({
                description: expect.not.stringMatching("UwU"),
                id: expect.any(Number),
                name: expect.stringMatching(/[a-zA-Z]/),
            });
            expect(response.body).not.toContain({"error": "Il n'y a pas de produit correspondant!"});

        });
    });
});

describe("POST ONE /product", () => {
    const productId = 9;

    describe("Check status of response", () => {
        it("response with json", async () => {
            const response = await request(app).post(`/api/product/${productId}/user`);
            expect(response.type).toBe("application/json");
            expect(response.type).not.toBe("application/xml");
        });

        it("response status code 200", async () => {
            const response = await request(app).get("/api/product/9/user");
            expect(response.statusCode).toBe(404);
            expect(response.statusCode).not.toBe(200);
            expect(response.statusCode).not.toBe(401);
            expect(response.statusCode).not.toBe(500);
        });
    });
});
