var express = require("express");
var router = express.Router();

const {
  todoItemController,
  controller,
} = require("../../controllers/todoItem.controller");

const todoItemValidators = require("../../validators/todoItem.validators");
const runValidations = require("../../validators/index.middleware");

const ROLES = require("../../data/roles.constant.json");
const authMiddleware = require("../../middleware/auth.middleware");

//TODO: fix model and delete todo

router.get(
  "/own/",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  runValidations,
  todoItemController.getAllOwn
);

router.get(
  "/own/:id",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  todoItemValidators.findTodoItemByIdValidator,
  runValidations,
  todoItemController.getOwnById
);

router.post(
  "/own",
  todoItemValidators.createTodoItemValidator,
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  todoItemValidators.createTodoItemValidator,
  runValidations,
  todoItemController.createOwn
);

router.patch(
  "/own/theme/:id",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  todoItemValidators.findTodoItemByIdValidator,
  todoItemValidators.changeThemeValidator,
  runValidations,
  todoItemController.changeTheme
);

router.patch(
  "/own/completed/:id",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  todoItemValidators.findTodoItemByIdValidator,
  runValidations,
  controller.toggleComplete
);

router.patch(
  "/own/:id",
  todoItemValidators.findTodoItemByIdValidator,
  todoItemValidators.createTodoItemValidator,
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  runValidations,
  todoItemController.updateById
);

router.delete(
  "/own/:id",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  todoItemValidators.findTodoItemByIdValidator,
  runValidations,
  todoItemController.deleteById
);

//admin
router.get("/", todoItemController.getAll);

router.get(
  "/:id",
  todoItemValidators.findTodoItemByIdValidator,
  runValidations,
  todoItemController.getById
);

module.exports = router;
