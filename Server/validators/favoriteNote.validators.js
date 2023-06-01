const { body, param } = require("express-validator");

const createFavoriteNoteValidator = [
  body("user_id")
    .optional()
    .isMongoId()
    .withMessage("user_id must be a non-empty ID"),
  body("notes_id")
    .optional()
    .isArray()
    .withMessage("notes_id must be a non-empty array"),
  body("notes_id.*").isMongoId().withMessage("Invalid note id"),
];

const toggleFavoriteNoteValidator = [
  body("notes_id")
  .notEmpty()
  .withMessage("notes_id must be a non-empty string")
  .isMongoId()
  .withMessage("notes_id must be a valid Mongo ID")
];

const findFavoriteNoteByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("The ID required")
    .isMongoId()
    .withMessage("Invalid favorite ID"),
];

module.exports = {
  createFavoriteNoteValidator,
  toggleFavoriteNoteValidator,
  findFavoriteNoteByIdValidator,
};
