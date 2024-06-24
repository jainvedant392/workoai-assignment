const userDao = require("../daos/userDao");

exports.listUsers = async () => {
  return await userDao.listUsers();
};

exports.getUserDetails = async (userId) => {
  return await userDao.getUserDetails(userId);
};

exports.updateUser = async (userId, userData) => {
  return await userDao.updateUser(userId, userData);
};

exports.patchUser = async (userId, userData) => {
  return await userDao.patchUser(userId, userData);
};

exports.softDeleteUser = async (userId) => {
  return await userDao.softDeleteUser(userId);
};
