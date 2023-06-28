const { body, param, query } = require("express-validator");

const createUserValidator = [
  body("firstname")
    .notEmpty()
    .withMessage("Firstname is required")
    .bail()
    .isString()
    .withMessage("Firstname must be a string"),
  body("lastname")
    .notEmpty()
    .withMessage("Lastname is required")
    .bail()
    .isString()
    .withMessage("Lastname must be a string"),
  body("username")
    .notEmpty()
    .withMessage("The username is required")
    .bail()
    .isString()
    .withMessage("The username must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
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
  body("phone_number")
    .notEmpty()
    .withMessage("Phone number is required")
    .bail()
    .isMobilePhone()
    .withMessage("Invalid phone number"),
  body("roles").optional().isArray().withMessage("roles must be array"),
  body("roles.*")
    .not()
    .isArray()
    .isString()
    .withMessage("roles must contain strings only"),
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
  body("level").optional().isString().withMessage("The level must be a string"),
  body("daily_score")
    .optional()
    .isNumeric()
    .withMessage("Daily score must be a number")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Daily score must be a positive integer"),
  body("weekly_score")
    .optional()
    .isNumeric()
    .withMessage("Weekly score must be a number")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Weekly score must be a positive integer"),
  body("monthly_score")
    .optional()
    .isNumeric()
    .withMessage("Monthly score must be a number")
    .bail()
    .isInt({ min: 0 })
    .withMessage("Monthly score must be a positive integer"),
];

const updateUserValidator = [
  body("firstname")
    .notEmpty()
    .withMessage("Firstname is required")
    .bail()
    .isString()
    .withMessage("Firstname must be a string"),
  body("lastname")
    .notEmpty()
    .withMessage("Lastname is required")
    .bail()
    .isString()
    .withMessage("Lastname must be a string"),
  body("username")
    .notEmpty()
    .withMessage("The username is required")
    .bail()
    .isString()
    .withMessage("The username must be a string"),
  body("date_birth")
    .notEmpty()
    .withMessage("Date of birth is required")
    .bail()
    .isDate()
    .withMessage("Invalid date of birth"),
  body("phone_number")
    .notEmpty()
    .withMessage("Phone number is required")
    .bail()
    .isMobilePhone()
    .withMessage("Invalid phone number"),
  body("profile_pic")
    .optional()
    .isURL()
    .withMessage("Invalid profile picture URL"),
];

const singInValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid Email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

const recoveryPasswordValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Invalid Email address"),
  body("recoveryCode").notEmpty().withMessage("Recovery code is required"),
  body("newPassword").notEmpty().withMessage("New password is required"),
];

const changePasswordValidator = [
  body("oldPassword").notEmpty().withMessage("Old password is required"),
  body("newPassword").notEmpty().withMessage("New password is required"),
];

const topUsersValidator = [
  query("sortBy")
    .optional()
    .isIn(["daily_score", "weekly_score", "monthly_score", "total_score"])
    .withMessage("Invalid sortBy field"),
  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Invalid order value"),
];

const scoreValidator = [
  body("score")
    .isNumeric()
    .withMessage("Score must be a numeric value")
    .notEmpty()
    .withMessage("Score is required"),
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
  updateUserValidator,
  singInValidator,
  findUserByIdValidator,
  recoveryPasswordValidator,
  changePasswordValidator,
  topUsersValidator,
  scoreValidator,
};
