var express = require("express");
var router = express.Router();

const userController = require("../../controllers/user.controller");

const userValidators = require("../../validators/user.validators");
const runValidations = require("../../validators/index.middleware");

router.get("/", userController.getAll);

router.get("/:id", userController.getById);

router.post(
  "/",
  userValidators.createUserValidator,
  runValidations,
  userController.create
);

router.patch(
  "/:id",
  userValidators.findUserByIdValidator,
  userValidators.createUserValidator,
  runValidations,
  userController.updateById
);

router.delete(
  "/:id",
  userValidators.findUserByIdValidator,
  runValidations,
  userController.deleteById
);

module.exports = router;
