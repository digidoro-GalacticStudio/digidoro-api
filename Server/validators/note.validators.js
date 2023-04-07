const { body, param } = require("express-validator");

const createNoteValidator = [
  body("user_id")
    .notEmpty()
    .withMessage("User ID can't be empty")
    .bail()
    .isMongoId()
    .withMessage("User ID must be a valid Mongo ID"),
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .bail()
    .isString()
    .withMessage("Title must be a string"),
  body("message")
    .notEmpty()
    .withMessage("Message is required")
    .bail()
    .isString()
    .withMessage("Message must be a string"),
  body("tags").isArray().withMessage("Tags must be an array"),
  body("tags.*").optional().isString().withMessage("Tags must be strings"),
  body("theme")
    .notEmpty()
    .withMessage("Color is required")
    .bail()
    .isHexColor()
    .withMessage("Color must be a valid hex color code"),
];

const findNoteByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("The ID required")
    .isMongoId()
    .withMessage("Invalid note ID"),
];

module.exports = {
  createNoteValidator,
  findNoteByIdValidator,
};
