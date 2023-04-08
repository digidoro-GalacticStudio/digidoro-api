const { body, param } = require("express-validator");

const createUserValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string"),
  body("lastname")
    .notEmpty()
    .withMessage("Lastname is required")
    .bail()
    .isString()
    .withMessage("Lastname must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email address"),
  body("password_hash")
    .notEmpty()
    .withMessage("Password is required")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("date_birth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .bail()
    .isDate()
    .withMessage("Invalid date of birth"),
  body("roles")  
    .optional()
    .isArray().withMessage("roles must be array"),
  body("roles.*").not().isArray().isString().withMessage("roles must contain strings only"),
  body("profile_pic")
    .optional()
    .isURL()
    .withMessage("Invalid profile picture URL"),
  body("point")
    .optional()
    .isInt()
    .withMessage("Point must be an integer")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Point must be a positive integer"),
];

const findUserByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("The ID required")
    .isMongoId()
    .withMessage("Invalid user ID"),
];

module.exports = {
  createUserValidator,
  findUserByIdValidator,
};
