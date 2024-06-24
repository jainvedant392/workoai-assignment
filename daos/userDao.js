const User = require("../models/userModel");

exports.listUsers = async () => {
  return await User.find({ deleted: { $ne: true } });
};

exports.getUserDetails = async (userId) => {
  return await User.findById(userId).where({ deleted: { $ne: true } });
};

exports.updateUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true }).where({
    deleted: { $ne: true },
  });
};

exports.patchUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true }).where({
    deleted: { $ne: true },
  });
};

exports.softDeleteUser = async (userId) => {
  return await User.findByIdAndUpdate(userId, { deleted: true }, { new: true });
};
