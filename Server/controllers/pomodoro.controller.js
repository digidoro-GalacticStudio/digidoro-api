const debug = require("debug")("digidoro:pomodoro-controller");
const Pomodoro = require("../models/pomodoro.model");
const createCrudController = require("./general.controller");

const pomodoroController = createCrudController(Pomodoro);

module.exports = pomodoroController;
