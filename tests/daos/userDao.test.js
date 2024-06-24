const mongoose = require("mongoose");
const userDao = require("../../daos/userDao");
const User = require("../../models/userModel");

beforeAll(async () => {
  await mongoose.connect("mongodb://localhost:27017/workoai");
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("User DAO - listUsers", () => {
  it("should return a list of users", async () => {
    // First clearing the database
    await User.deleteMany({});

    // Create test users
    const user1 = await User.create({
      email: "user1@example.com",
      password: "password1",
      name: "User 1",
      age: 30,
      city: "City 1",
      zipCode: "12345",
      role: "user",
      deleted: false,
    });
    user1.save();

    const user2 = await User.create({
      email: "user2@example.com",
      password: "password2",
      name: "User 2",
      age: 25,
      city: "City 2",
      zipCode: "23456",
      role: "user",
      deleted: false,
    });
    user2.save();

    // Call the listUsers function
    const users = await userDao.listUsers();

    // Assertions
    expect(users).toBeDefined();
    expect(users.length).toBe(2);
    expect(users[0].name).toBe("User 1");
    expect(users[1].name).toBe("User 2");
  });
});

describe("User DAO - getUserDetails", () => {
  it("should return details of a user", async () => {
    const newUser = await User.create({
      email: "testuser@example.com",
      password: "password",
      name: "Test User",
      age: 28,
      city: "Test City",
      zipCode: "54321",
      role: "user",
      deleted: false,
    });
    newUser.save();

    const userId = newUser._id;

    const userDetails = await userDao.getUserDetails(userId);

    expect(userDetails).toBeDefined();
    expect(userDetails.name).toBe("Test User");
    expect(userDetails.age).toBe(28);
  });
});

describe("User DAO - updateUser", () => {
  it("should update user details", async () => {
    const newUser = await User.create({
      email: "updateuser@example.com",
      password: "password",
      name: "Update User",
      age: 35,
      city: "Update City",
      zipCode: "98765",
      role: "user",
      deleted: false,
    });

    const userId = newUser._id;

    const updatedUserData = {
      name: "Updated Name",
      city: "Updated City",
    };

    const updatedUser = await userDao.updateUser(userId, updatedUserData);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe("Updated Name");
    expect(updatedUser.city).toBe("Updated City");
  });
});

describe("User DAO - patchUser", () => {
  it("should patch user details", async () => {
    const newUser = await User.create({
      email: "patchuser@example.com",
      password: "password",
      name: "Patch User",
      age: 40,
      city: "Patch City",
      zipCode: "45678",
      role: "user",
      deleted: false,
    });

    const userId = newUser._id;

    const patchData = {
      city: "Patched City",
    };

    const patchedUser = await userDao.patchUser(userId, patchData);

    expect(patchedUser).toBeDefined();
    expect(patchedUser.city).toBe("Patched City");
    expect(patchedUser.name).toBe("Patch User"); // Ensure other fields are unchanged
  });
});

describe("User DAO - softDeleteUser", () => {
  it("should soft delete a user", async () => {
    const newUser = await User.create({
      email: "deleteduser@example.com",
      password: "password",
      name: "Deleted User",
      age: 50,
      city: "Deleted City",
      zipCode: "56789",
      role: "user",
      deleted: false,
    });

    const userId = newUser._id;

    const deletedUser = await userDao.softDeleteUser(userId);

    expect(deletedUser).toBeDefined();
    expect(deletedUser.deleted).toBe(true);
  });
});
