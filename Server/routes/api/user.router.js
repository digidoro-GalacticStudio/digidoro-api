var express = require("express");
var router = express.Router();

const {
  userController,
  authController,
} = require("../../controllers/user.controller");

const ROLES = require("../../data/roles.constant.json");
const authMiddleware = require("../../middleware/auth.middleware");

const userValidators = require("../../validators/user.validators");
const runValidations = require("../../validators/index.middleware");

router.get("/", userController.getAll);

router.get(
  "/topUsers",
  userValidators.topUsersValidator,
  runValidations,
  userController.getTopUsersByScore
);

router.get(
  "/ranking",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  runValidations,
  userController.getUserInfoRanking
);

router.get(
  "/own/",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  runValidations,
  userController.getCurrentUser
);

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

router.post(
  "/recoveryPassword",
  userValidators.recoveryPasswordValidator,
  runValidations,
  authController.recoveryPassword
);

router.post(
  "/changePassword",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  userValidators.changePasswordValidator,
  runValidations,
  authController.changePassword
);

router.post(
  "/premium",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  runValidations,
  authController.getPremium
);

router.patch(
  "/",
  userValidators.createUserValidator,
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  runValidations,
  userController.updateOwnById
);

router.patch(
  "/own/",
  userValidators.updateUserValidator,
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  runValidations,
  authController.updateUser
);

router.patch(
  "/updateScores",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  userValidators.scoreValidator,
  runValidations,
  userController.updateScores
);

router.delete(
  "/",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  runValidations,
  userController.deleteOwn
);

//ADMIN routes over users accounts
router.patch(
  "/admin/:id",
  userValidators.findUserByIdValidator,
  userValidators.createUserValidator,
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.ADMIN),
  runValidations,
  userController.updateById
);

router.delete(
  "/admin/:id",
  userValidators.findUserByIdValidator,
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.ADMIN),
  runValidations,
  userController.deleteById
);

module.exports = router;
