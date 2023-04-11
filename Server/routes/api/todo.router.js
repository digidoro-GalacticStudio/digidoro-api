var express = require("express");
var router = express.Router();

const todoController = require("../../controllers/todo.controller");

const todoValidators = require("../../validators/todo.validators");
const runValidations = require("../../validators/index.middleware");

router.get("/", todoController.getAll);

router.get(
  "/:id",
  todoValidators.findTodoByIdValidator,
  runValidations,
  todoController.getById
);

router.post(
  "/",
  todoValidators.createTodoValidator,
  runValidations,
  todoController.create
);

router.patch(
  "/:id",
  todoValidators.findTodoByIdValidator,
  todoValidators.createTodoValidator,
  runValidations,
  todoController.updateById
);

router.delete(
  "/:id",
  todoValidators.findTodoByIdValidator,
  runValidations,
  todoController.deleteById
);

module.exports = router;
