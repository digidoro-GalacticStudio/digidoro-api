var express = require("express");
var router = express.Router();

const pomodoroController = require("../../controllers/pomodoro.controller");

const pomodroValidators = require("../../validators/pomodoro.validator");
const runValidations = require("../../validators/index.middleware");
const userController = require("../../controllers/user.controller");

router.get("/", pomodoroController.getAll);

router.get("/:id", )

module.exports = router;