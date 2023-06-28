var express = require("express");
var router = express.Router();

const pomodoroController = require("../../controllers/pomodoro.controller");

const {
  authentication,
  authorization,
} = require("../../middleware/auth.middleware");
const ROLES = require("../../data/roles.constant.json");
const pomodoroValidator = require("../../validators/pomodoro.validator");
const runValidations = require("../../validators/index.middleware");

//user
router.get(
  "/own",
  authentication,
  authorization(ROLES.USER),
  runValidations,
  pomodoroController.getAllOwn
);

router.get(
  "/own/:id",
  authentication,
  authorization(ROLES.USER),
  pomodoroValidator.findPomodoroByIdValidator,
  runValidations,
  pomodoroController.getOwnById
);

router.post(
  "/own",
  authentication,
  authorization(ROLES.USER),
  pomodoroValidator.createPomodoroValidator,
  runValidations,
  pomodoroController.createOwn
);

router.patch(
  "/own/theme/:id",
  authentication,
  authorization(ROLES.PREMIUM),
  pomodoroValidator.findPomodoroByIdValidator,
  pomodoroValidator.changeThemeValidator,
  runValidations,
  pomodoroController.changeTheme
);

router.patch(
  "/own/:id",
  authentication,
  authorization(ROLES.USER),
  pomodoroValidator.findPomodoroByIdValidator,
  pomodoroValidator.createPomodoroValidator,
  runValidations,
  pomodoroController.updateById
);

router.delete(
  "/own/:id",
  pomodoroValidator.findPomodoroByIdValidator,
  runValidations,
  pomodoroController.deleteById
);

//admin
router.get("/", pomodoroController.getAll);

router.get(
  "/:id",
  authentication,
  authorization(ROLES.ADMIN),
  pomodoroValidator.findPomodoroByIdValidator,
  runValidations,
  pomodoroController.getById
);

router.post(
  "/",

  pomodoroValidator.createPomodoroValidator,
  runValidations,
  pomodoroController.create
);

router.patch(
  "/:id",
  pomodoroValidator.findPomodoroByIdValidator,
  runValidations,
  pomodoroController.updateById
);

router.delete(
  "/:id",
  pomodoroValidator.findPomodoroByIdValidator,
  runValidations,
  pomodoroController.deleteById
);

module.exports = router;
