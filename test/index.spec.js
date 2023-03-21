const request = require("supertest");
const app = require("../src/app");
//we dont need to put require("jest") because Jest is already globally available.
//describe es como una sección donde voy a tener muchos tests

describe("GET routes", () => {
  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/home").send();
    expect(response.statusCode).toBe(200);
  });

  test("should respond with a 200 status code", async () => {
    const response = await request(app).get("/task").send();
    expect(response.statusCode).toBe(200);
  });

  test("should respond with an array", async () => {
    const response = await request(app).get("/task").send();
    expect(response.body).toBeInstanceOf(Array);
  });
});

describe("POST routes", () => {
  describe("given a title and a description", () => {
    const sampleTask = {
      title: "task title",
      description: "a simple task description",
    };
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/task").send(sampleTask);
      expect(response.statusCode).toBe(200);
    });

    test("should have  a content type: application/json in header", async () => {
      const response = await request(app).post("/task").send(sampleTask);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("should post an ID", async () => {
      const response = await request(app).post("/task").send(sampleTask);
      expect(response.body.id).toBeDefined();
    });
  });

  describe("when title a description is missing", () => {
    test("should respond with a 404 status code", async () => {
      const fields = [
        {},
        { title: "test task" },
        { description: "sample description" },
      ];

      for (body of fields) {
        const response = await request(app).post("/tasks").send(body);
        expect(response.statusCode).toBe(404);
      }
    });
  });
});
