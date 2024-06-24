const authService = require("../services/authService");

const register = async (req, res) => {
  const { email, password, name, age, city, zipCode, role } = req.body;

  try {
    const user = await authService.registerUser({
      email,
      password,
      name,
      age,
      city,
      zipCode,
      role,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.loginUser(email, password);
    res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "Logged in successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(201).json({ message: "Logged out successfully" });
};

module.exports = {
  register,
  login,
  logout,
};
