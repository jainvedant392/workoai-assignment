const User = require("../models/userModel");

const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

const findUserByEmail = async (email) => {
  return await User.findOne({ email, deleted: false });
};

module.exports = {
  createUser,
  findUserByEmail,
};
