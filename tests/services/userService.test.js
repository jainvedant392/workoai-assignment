// tests/services/userService.test.js

const userService = require("../../services/userService");
const userDao = require("../mocks/userDao");

jest.mock("../../daos/userDao", () => require("../mocks/userDao"));

describe("User Services - listUsers", () => {
  it("should return a list of users", async () => {
    const users = await userService.listUsers();

    expect(users).toBeDefined();
    expect(users.length).toBe(2); // Assuming two mock users are returned
    expect(users[0].name).toBe("User 1");
    expect(users[1].name).toBe("User 2");
  });
});

describe("User Services - getUserDetails", () => {
  it("should return details of a user", async () => {
    const userId = "609d7a2b772f040014a4a7f8"; // ID of the first mock user

    const userDetails = await userService.getUserDetails(userId);

    expect(userDetails).toBeDefined();
    expect(userDetails.name).toBe("User 1");
  });

  it("should return null for non-existent user", async () => {
    const userId = "invalidUserId"; // Non-existent user ID

    const userDetails = await userService.getUserDetails(userId);

    expect(userDetails).toBeNull();
  });
});

describe("User Services - updateUser", () => {
  it("should update user details", async () => {
    const userId = "609d7a2b772f040014a4a7f8"; // ID of the first mock user
    const updatedUserData = { name: "Updated User 1" };

    const updatedUser = await userService.updateUser(userId, updatedUserData);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe("Updated User 1");
  });

  it("should return null for non-existent user", async () => {
    const userId = "invalidUserId"; // Non-existent user ID
    const updatedUserData = { name: "Updated User" };

    const updatedUser = await userService.updateUser(userId, updatedUserData);

    expect(updatedUser).toBeNull();
  });
});

describe("User Services - patchUser", () => {
  it("should patch user details", async () => {
    const userId = "609d7a2b772f040014a4a7f8"; // ID of the first mock user
    const patchData = { city: "Updated City 1" };

    const patchedUser = await userService.patchUser(userId, patchData);

    expect(patchedUser).toBeDefined();
    expect(patchedUser.city).toBe("Updated City 1");
  });

  it("should return null for non-existent user", async () => {
    const userId = "invalidUserId"; // Non-existent user ID
    const patchData = { city: "Updated City" };

    const patchedUser = await userService.patchUser(userId, patchData);

    expect(patchedUser).toBeNull();
  });
});

describe("User Services - softDeleteUser", () => {
  it("should soft delete a user", async () => {
    const userId = "609d7a2b772f040014a4a7f8"; // ID of the first mock user

    const deletedUser = await userService.softDeleteUser(userId);

    expect(deletedUser).toBeDefined();
    expect(deletedUser.deleted).toBe(true);
  });

  it("should return null for non-existent user", async () => {
    const userId = "invalidUserId"; // Non-existent user ID

    const deletedUser = await userService.softDeleteUser(userId);

    expect(deletedUser).toBeNull();
  });
});
