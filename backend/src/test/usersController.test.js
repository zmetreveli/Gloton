// *! Para que funciona los jest hay que comentar la linea 7 de UserRoutes
const supertest = require("supertest");
const { app } = require("../server");
const fakeRequest = supertest(app);
const { connectDB, disconnectDB } = require("../mongo/connection/index");
const User = require("../schema/usersSchema");

describe("User Controller Tests", () => {
  let user;
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await disconnectDB();
  });

  describe("POST /users", () => {
    it("should create a new user and return 201 status", async () => {
      const userData = {
        email: "test@example.com",
        password: "123456",
        firstname: "Test",
        created_date: new Date(),
        phone: "1234567890",
      };
      const res = await fakeRequest.post("/users").send(userData);
      expect(res.status).toBe(201);
      expect(res.body.email).toBe(userData.email);
      user = res.body;
    });
  });

  describe("GET /users", () => {
    it("should return all users and a 200 status", async () => {
      const res = await fakeRequest.get("/users");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /users/:id", () => {
    it("should return a user by ID and a 200 status", async () => {
      const res = await fakeRequest.get(`/users/${user._id}`);
      expect(res.status).toBe(200);
      expect(res.body._id).toBe(user._id);
    });
  });

  describe("PATCH /users/:id", () => {
    it("should update a user's details and return 200 status", async () => {
      const updates = { firstName: "Updated Name" };
      const res = await fakeRequest.patch(`/users/${user._id}`).send(updates);
      expect(res.status).toBe(200);
      expect(res.body.updatedUser.firstName).toBe(updates.firstName);
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a user and return 200 status", async () => {
      const res = await fakeRequest.delete(`/users/${user._id}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toContain("eliminado");
    });
  });
});
