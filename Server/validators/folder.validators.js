const { body, param } = require("express-validator");

const createFolderValidator = [
  body("user_id")
    .notEmpty()
    .withMessage("User ID can't be empty")
    .bail()
    .isMongoId()
    .withMessage("User ID must be a valid Mongo ID"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .bail()
    .isString()
    .withMessage("Name must be a string"),
  body("theme")
    .notEmpty()
    .withMessage("Color is required")
    .bail()
    .isHexColor()
    .withMessage("Color must be a valid hex color code"),
  body("notes_id")
    .optional()
    .isArray()
    .isMongoId()
    .withMessage("Notes ID must be an array"),
];

const findFolderByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("The ID required")
    .isMongoId()
    .withMessage("Invalid folder ID"),
];

module.exports = {
  createFolderValidator,
  findFolderByIdValidator,
};
