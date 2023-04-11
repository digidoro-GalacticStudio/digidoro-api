const debug = require("debug")("digidoro:todo-item-controller");
const TodoItem = require("../models/todoItem.model");
const createCrudController = require("./general.controller");

const todoItemController = createCrudController(TodoItem);

module.exports = todoItemController;
