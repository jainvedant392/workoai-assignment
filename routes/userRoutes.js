const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userValidator = require("../validators/userValidator");
const {authenticateToken, authorizeAdmin} = require("../middlewares/auth");

router.get("/users",authenticateToken, authorizeAdmin, userController.listUsers);
router.get("/user/:userId", authenticateToken, userController.getUserDetails);
// creating the user by POST is being done by register in authRoutes
router.put(
  "/user/:userId",
  authenticateToken,
  userValidator.validateUserUpdate,
  userController.updateUser
);
router.patch(
  "/user/:userId",
  authenticateToken,
  userValidator.validateUserUpdate,
  userController.patchUser
);
router.delete(
  "/user/:userId",
  authenticateToken,
  userValidator.validateUserUpdate,
  userController.softDeleteUser
);

module.exports = router;
