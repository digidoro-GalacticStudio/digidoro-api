const { body, param } = require("express-validator");

const createFavoriteNoteValidator = [
  body("user_id")
    .notEmpty()
    .isMongoId()
    .withMessage("user_id must be a non-empty ID"),
  body("notes_id")
    .notEmpty()
    .isArray()
    .withMessage("notes_id must be a non-empty array"),
  body("notes_id.*").isMongoId().withMessage("Invalid note id"),
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
  findFavoriteNoteByIdValidator,
};
