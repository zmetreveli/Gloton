// *! Para que funciona los jest hay que comentar la linea 7 de UserRoutes
const supertest = require("supertest");
const { app } = require("../server");
const fakeRequest = supertest(app);
const { connectDB, disconnectDB } = require("../mongo/connection/index");
const Order = mongoose.model("Order");

describe("Order Controller Tests", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await Order.deleteMany({});
    await disconnectDB();
  });

  let order;

  describe("POST /orders", () => {
    it("should create a new order and return 201 status", async () => {
      const orderData = {
        productList: [
          { productName: "Pizza Margherita", quantity: 1, price: 9.99 },
        ],
        address: "123 Main St",
        date: "2023-01-01 12:00:00",
        billing: { method: "Credit Card", total: 9.99 },
        restaurante: "5f8f8f8f8f8f8f8f8f8f8f8",
        user: "5f8f8f8f8f8f8f8f8f8f8f8",
      };
      const res = await fakeRequest.post("/orders").send(orderData);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("_id");
      order = res.body;
    });
  });

  describe("GET /orders", () => {
    it("should return all orders and a 200 status", async () => {
      const res = await fakeRequest.get("/orders");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET /orders/:id", () => {
    it("should return an order by ID and a 200 status", async () => {
      if (!order || !order._id)
        throw new Error("Order was not created successfully.");
      const res = await fakeRequest.get(`/orders/${order._id}`);
      expect(res.status).toBe(200);
      expect(res.body._id).toBe(order._id);
      expect(res.body.address).toBe(order.address);
      expect(res.body.billing).toEqual(
        expect.objectContaining({ method: "Credit Card", total: 9.99 })
      );
    });
  });

  describe("PATCH /orders/:id", () => {
    it("should update an order's details and return 200 status", async () => {
      if (!order || !order._id)
        throw new Error("Order was not created successfully.");
      const updates = { address: "456 Main St" };
      const res = await fakeRequest.patch(`/orders/${order._id}`).send(updates);
      expect(res.status).toBe(200);
      expect(res.body.updatedOrder.address).toBe(updates.address);
    });
  });

  describe("DELETE /orders/:id", () => {
    it("should delete an order and return 200 status", async () => {
      if (!order || !order._id)
        throw new Error("Order was not created successfully.");
      const res = await fakeRequest.delete(`/orders/${order._id}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toContain("deleted successfully");
    });
  });
});
