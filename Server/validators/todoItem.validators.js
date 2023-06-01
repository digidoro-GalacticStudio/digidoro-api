const { body, param } = require("express-validator");

const createTodoItemValidator = [
  body("user_id")
  .optional()
  .isMongoId()
  .withMessage("Invalid user ID"),
  body("title")
    .notEmpty()
    .withMessage("Title cannot be empty")
    .bail()
    .isString()
    .withMessage("Title must be a string"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("theme")
    .optional()
    .isHexColor()
    .withMessage("Color must be a valid hex color code"),
  body("reminder")
    .optional()
    .isDate()
    .withMessage("Reminder must be a valid date"),
  body("isCompleted")
    .optional()
    .isBoolean()
    .withMessage("isCompleted must be a boolean"),
];

const findTodoItemByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("The ID required")
    .isMongoId()
    .withMessage("Invalid todo item ID"),
];

const changeThemeValidator = [  
  body("theme")
  .notEmpty()
  .withMessage("Theme cannot be empty")
  .bail()
  .isHexColor()
  .withMessage("Invalid theme"),
];

module.exports = {
  createTodoItemValidator,
  findTodoItemByIdValidator,
  changeThemeValidator,
};
