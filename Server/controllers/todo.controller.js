const debug = require("debug")("digidoro:todo-controller");
const Todo = require("../models/todo.model");
const createCrudController = require("./general.controller");

const todoController = createCrudController(Todo);

module.exports = todoController;
