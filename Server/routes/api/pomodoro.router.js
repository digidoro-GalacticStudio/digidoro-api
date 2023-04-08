var express = require("express");
var router = express.Router();

const pomodoroController = require("../../controllers/pomodoro.controller");

const pomodroValidators = require("../../validators/pomodoro.validator");
const runValidations = require("../../validators/index.middleware");

router.get("/", pomodoroController.getAll);

router.get("/:id", 
    pomodroValidators.findPomodoroByIdValidator,
    runValidations,
    pomodoroController.getById
);

router.post("/",
    pomodroValidators.createPomodoroValidator,
    runValidations,
    pomodoroController.create
);

router.patch("/:id", 
    pomodroValidators.findPomodoroByIdValidator,
    runValidations,
    pomodoroController.updateById
);

router.delete("/:id",
    pomodroValidators.findPomodoroByIdValidator,
    runValidations,
    pomodoroController.deleteById
);

module.exports = router;