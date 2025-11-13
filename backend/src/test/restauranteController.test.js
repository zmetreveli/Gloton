// *! Para que funciona los jest hay que comentar la linea 7 de UserRoutes
const supertest = require("supertest");
const { app } = require("../server");
const fakeRequest = supertest(app);
const { connectDB, disconnectDB } = require("../mongo/connection/index");
const Restaurante = require("../schema/RestauranteSchema");

describe("Restaurante Controller Tests", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await Restaurante.deleteMany({});
    await disconnectDB();
  });

  describe("POST /restaurantes", () => {
    it("should create a new restaurante and return 201 status", async () => {
      const restauranteData = {
        email: "restaurante@example.com",
        password: "Password123!",
      };
      const res = await fakeRequest.post("/restaurantes").send(restauranteData);
      expect(res.status).toBe(201);
      expect(res.body.email).toBe(restauranteData.email);
      restaurante = res.body;
    });
  });

  describe("GET /restaurantes", () => {
    it("should return all restaurantes and a 200 status", async () => {
      const res = await fakeRequest.get("/restaurantes");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe("GET /restaurantes/:id", () => {
    it("should return a restaurante by ID and a 200 status", async () => {
      const res = await fakeRequest.get(`/restaurantes/${restaurante._id}`);
      expect(res.status).toBe(200);
      expect(res.body._id).toBe(restaurante._id);
    });
  });

  describe("PATCH /restaurantes/:id", () => {
    it("should update a restaurante's details and return 200 status", async () => {
      const updates = { name: "Updated Name" };
      const res = await fakeRequest
        .patch(`/restaurantes/${restaurante._id}`)
        .send(updates);
      expect(res.status).toBe(200);
      expect(res.body.updatedRestaurante.brandName).toBe(updates.brandNameame);
    });
  });

  describe("DELETE /restaurantes/:id", () => {
    it("should delete a restaurante and return 200 status", async () => {
      const res = await fakeRequest.delete(`/restaurantes/${restaurante._id}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toContain("deleted successfully");
    });
  });
});
