const { body, param } = require("express-validator");

const createTodoValidator = [
  body("user_id")
    .optional()
    //.notEmpty
    //.withMessage("User ID can't be empty")
    //.bail()
    .isMongoId()
    .withMessage("User ID must be a valid Mongo ID"),
  body("items_id").isArray().withMessage("itemsId should be an array"),
  body("items_Id.*")
    .isMongoId()
    .withMessage("itemsId should be an array of mongoIds"),
];

const findTodoByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("The ID required")
    .isMongoId()
    .withMessage("Invalid todo ID"),
];

module.exports = {
  createTodoValidator,
  findTodoByIdValidator,
};
