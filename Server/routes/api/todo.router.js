var express = require("express");
var router = express.Router();

const { todoController, controller } = require("../../controllers/todo.controller");

const todoValidators = require("../../validators/todo.validators");
const runValidations = require("../../validators/index.middleware");
const ROLES = require("../../data/roles.constant.json");
const authMiddleware = require("../../middleware/auth.middleware");

//TODO: think if todo table is needed or it might be implemented some query to 
//get items by user and creation date

router.get("/",
  authMiddleware.authentication,
  runValidations, 
  todoController.getAll
);

router.get(
  "/:id",
  authMiddleware.authentication,
  todoValidators.findTodoByIdValidator,
  runValidations,
  todoController.getById
);


router.post(
  "/",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  //todoValidators.createTodoValidator,
  runValidations,
  todoController.createOwn
);

//add or delete items
router.patch(
  "/toggleItem/:id",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  todoValidators.findTodoByIdValidator,
  todoValidators.createTodoValidator,
  runValidations,
  controller.toggleItem
);

router.patch(
  "/:id",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  todoValidators.findTodoByIdValidator,
  todoValidators.createTodoValidator,
  runValidations,
  controller.updateOwnListItems
);

router.delete(
  "/:id",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  todoValidators.findTodoByIdValidator,
  runValidations,
  todoController.deleteById
);

//general
router.post(
  "/general",
  todoValidators.createTodoValidator,
  runValidations,
  todoController.create
);
module.exports = router;
