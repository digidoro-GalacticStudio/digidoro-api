var express = require("express");
var router = express.Router();

const todoItemController = require("../../controllers/todoItem.controller");

const todoItemValidators = require("../../validators/todoItem.validators");
const runValidations = require("../../validators/index.middleware");

router.get("/", todoItemController.getAll);

router.get(
  "/:id",
  todoItemValidators.findTodoItemByIdValidator,
  runValidations,
  todoItemController.getById
);

router.post(
  "/",
  todoItemValidators.createTodoItemValidator,
  runValidations,
  todoItemController.create
);

router.patch(
  "/:id",
  todoItemValidators.findTodoItemByIdValidator,
  todoItemValidators.createTodoItemValidator,
  runValidations,
  todoItemController.updateById
);

router.delete(
  "/:id",
  todoItemValidators.findTodoItemByIdValidator,
  runValidations,
  todoItemController.deleteById
);

module.exports = router;
