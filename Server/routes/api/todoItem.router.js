var express = require("express");
var router = express.Router();

const todoItemController = require("../../controllers/todoItem.controller");

const todoItemValidators = require("../../validators/todoItem.validators");
const runValidations = require("../../validators/index.middleware");

const ROLES = require("../../data/roles.constant.json");
const authMiddleware = require("../../middleware/auth.middleware");

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
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  runValidations,
  todoItemController.create
);

router.patch(
  "/:id",
  todoItemValidators.findTodoItemByIdValidator,
  todoItemValidators.createTodoItemValidator,
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  runValidations,
  todoItemController.updateById
);

router.delete(
  "/:id",
  todoItemValidators.findTodoItemByIdValidator,
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  runValidations,
  todoItemController.deleteById
);

module.exports = router;
