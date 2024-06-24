const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authDao = require("../daos/authDao");

const registerUser = async (userData) => {
  const user = await authDao.createUser(userData);
  return user;
};

const loginUser = async (email, password) => {
  const user = await authDao.findUserByEmail(email);
  if (!user) {
    throw new Error("Email or password is incorrect");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error("Email or password is incorrect");
  }

  const token = jwt.sign(
    { _id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

module.exports = {
  registerUser,
  loginUser,
};
