const userService = require("../services/userService");
const UserDTO = require("../dtos/userDto");

exports.listUsers = async (req, res) => {
  try {
    const users = await userService.listUsers();
    res.status(200).json(users.map((user) => new UserDTO(user)));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const user = await userService.getUserDetails(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(new UserDTO(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.userId, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(new UserDTO(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.patchUser = async (req, res) => {
  try {
    const user = await userService.patchUser(req.params.userId, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(new UserDTO(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.softDeleteUser = async (req, res) => {
  try {
    const user = await userService.softDeleteUser(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User soft deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
