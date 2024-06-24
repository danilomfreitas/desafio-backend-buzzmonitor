const request = require("supertest");
const app = require("../src/app");
const OrderService = require("../src/services/orderService");
const BookService = require("../src/services/bookService");

jest.mock("../src/services/orderService");
jest.mock("../src/services/bookService");

describe("Order Controller", () => {
  beforeEach(async () => {
    let createdBook = {
      id: 1,
      title: "Test Book",
      author: "Test Author",
      release_year: 2021,
      inventory: 10,
    };
    BookService.createBook.mockResolvedValue(createdBook);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create an order", async () => {
    const mockOrder = {
      id: 1,
      book_id: 1,
      quantity: 2,
      status: "Accepted",
    };

    OrderService.createOrder.mockResolvedValue({
      status: "success",
      order: mockOrder,
    });

    const res = await request(app).post("/orders").send({
      book_id: 1,
      quantity: 2,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual(mockOrder);
  });

  it("should retrieve all orders", async () => {
    const orders = [
      { id: 1, book_id: 1, quantity: 5, status: "Accepted" },
      { id: 2, book_id: 1, quantity: 25, status: "Refused" },
    ];

    OrderService.getAllOrders.mockResolvedValue(orders);

    const res = await request(app).get("/orders");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(orders);
  });

  it("should filter orders by book_id", async () => {
    const orders = [{ id: 1, book_id: 1, quantity: 5, status: "Accepted" }];

    OrderService.getOrdersByFilters.mockResolvedValue(orders);

    const res = await request(app).get("/orders/search?book_id=1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(orders);
  });

  it("should filter orders by status", async () => {
    const orders = [{ id: 1, book_id: 1, quantity: 5, status: "Accepted" }];

    OrderService.getOrdersByFilters.mockResolvedValue(orders);

    const res = await request(app).get("/orders/search?status=Accepted");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(orders);
  });

  it("should filter orders by book_id and status", async () => {
    const orders = [{ id: 1, book_id: 1, quantity: 5, status: "Accepted" }];

    OrderService.getOrdersByFilters.mockResolvedValue(orders);

    const res = await request(app).get(
      "/orders/search?book_id=1&status=Accepted"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(orders);
  });
});
