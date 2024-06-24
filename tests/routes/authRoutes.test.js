require("dotenv").config();
const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("../../routes/authRoutes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/workoai");
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("Auth Routes", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test@example.com",
      password: "password",
      name: "Test User",
      age: 25,
      city: "Test City",
      zipCode: "12345",
      role: "user",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });

  it("should login a user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password",
    });

    expect(res.statusCode).toBe(201); // Check status code
    expect(res.body.message).toBe("Logged in successfully"); // Check response message
  });

  it("should logout a user", async () => {
    // Logout the user
    const logoutRes = await request(app).post("/api/auth/logout");

    expect(logoutRes.statusCode).toBe(201); // Check logout status
    expect(logoutRes.body.message).toBe("Logged out successfully"); // Check response message
  });
});
