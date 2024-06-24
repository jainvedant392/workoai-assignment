let mockUsers = [
    {
      _id: "609d7a2b772f040014a4a7f8",
      email: "user1@example.com",
      password: "password1",
      name: "User 1",
      age: 30,
      city: "City 1",
      zipCode: "12345",
      role: "user",
      deleted: false,
    },
    {
      _id: "609d7a2b772f040014a4a7f9",
      email: "user2@example.com",
      password: "password2",
      name: "User 2",
      age: 25,
      city: "City 2",
      zipCode: "23456",
      role: "user",
      deleted: false,
    },
  ];
  
  const listUsers = async () => {
    return mockUsers.filter((user) => !user.deleted);
  };
  
  const getUserDetails = async (userId) => {
    return mockUsers.find((user) => user._id === userId && !user.deleted) || null;
  };
  
  const updateUser = async (userId, userData) => {
    const index = mockUsers.findIndex((user) => user._id === userId);
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...userData };
      return mockUsers[index];
    }
    return null;
  };
  
  const patchUser = async (userId, userData) => {
    const index = mockUsers.findIndex((user) => user._id === userId);
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...userData };
      return mockUsers[index];
    }
    return null;
  };
  
  const softDeleteUser = async (userId) => {
    const index = mockUsers.findIndex((user) => user._id === userId);
    if (index !== -1) {
      mockUsers[index].deleted = true;
      return mockUsers[index];
    }
    return null;
  };
  
  module.exports = {
    listUsers,
    getUserDetails,
    updateUser,
    patchUser,
    softDeleteUser,
  };
  