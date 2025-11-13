// *! Para que funciona los jest hay que comentar la linea 7 de UserRoutes
const supertest = require("supertest");
const { app } = require("../server");
const fakeRequest = supertest(app);
const { connectDB, disconnectDB } = require("../mongo/connection/index");
const Order = require("../schema/OrderSchema");

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
        productList: [{ productName: "Pizza", quantity: 2 }],
        user_id: "someUserId",
        restaurante_id: "someRestauranteId",
        billing: "Credit Card",
        address: "123 Main St",
      };
      const res = await fakeRequest.post("/orders").send(orderData);
      expect(res.status).toBe(201);
      expect(res.body.order).toHaveProperty("id");
      order = res.body.order;
    });
  });

  describe("GET /orders", () => {
    it("should return all orders and a 200 status", async () => {
      const res = await fakeRequest.get("/orders");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe("GET /orders/:id", () => {
    it("should return a order by ID and a 200 status", async () => {
      const res = await fakeRequest.get(`/orders/${order._id}`);
      expect(res.status).toBe(200);
      expect(res.body._id).toBe(order._id);
    });
  });

  describe("PATCH /orders/:id", () => {
    it("should update an order's details and return 200 status", async () => {
      const updates = { address: "456 Main St" };
      const res = await fakeRequest.patch(`/orders/${order._id}`).send(updates);
      expect(res.status).toBe(200);
      expect(res.body.updatedOrder.address).toBe(updates.address);
    });
  });

  describe("DELETE /orders/:id", () => {
    it("should delete an order and return 200 status", async () => {
      const res = await fakeRequest.delete(`/orders/${order.id}`);
      expect(res.status).toBe(200);
      expect(res.body.message).toContain("deleted successfully");
    });
  });
});
