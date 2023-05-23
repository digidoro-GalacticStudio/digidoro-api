var express = require("express");
var router = express.Router();

const {
  userController,
  authController,
} = require("../../controllers/user.controller");

const ROLES  = require("../../data/roles.constant.json");
const authMiddleware = require("../../middleware/auth.middleware");

const userValidators = require("../../validators/user.validators");
const runValidations = require("../../validators/index.middleware");

router.get("/", userController.getAll);

router.get(
  "/:id",
  userValidators.findUserByIdValidator,
  runValidations,
  userController.getById
);

router.post(
  "/register",
  userValidators.createUserValidator,
  runValidations,
  authController.register
);

router.post(
  "/singin",
  userValidators.singInValidator,
  runValidations,
  authController.singin
);

router.patch(
  "/:id",
  userValidators.findUserByIdValidator,
  userValidators.createUserValidator,
  runValidations,
  userController.updateById
);

router.delete("/",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  runValidations,
  userController.deleteById
);

module.exports = router;
