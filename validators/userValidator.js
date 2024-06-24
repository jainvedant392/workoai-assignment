const { body, param, validationResult } = require("express-validator");

exports.validateUserCreation = [
  body("email").isEmail().withMessage("Invalid email"),
  body("zipCode").isPostalCode("any").withMessage("Invalid zip code"),
  body("name").notEmpty().withMessage("Name is required"),
  body("age").isInt({ min: 0 }).withMessage("Age must be a positive integer"),
  body("city").notEmpty().withMessage("City is required"),
  (req, resp, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateUserUpdate = [
  param("userId").isMongoId().withMessage("Invalid user id"),
  body("email").optional().isEmail().withMessage("Invalid email"),
  body("zipCode")
    .optional()
    .isPostalCode("any")
    .withMessage("Invalid zip code"),
  body("name").optional().notEmpty().withMessage("Name is required"),
  body("age")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Age must be a positive integer"),
  body("city").optional().notEmpty().withMessage("City is required"),
  (req, resp, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
