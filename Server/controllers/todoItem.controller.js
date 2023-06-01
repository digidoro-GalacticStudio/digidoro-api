const debug = require("debug")("digidoro:todo-item-controller");
const { sendError, sendSuccess } = require("../helpers/apiResponse");
const TodoItem = require("../models/todoItem.model");
const createCrudController = require("./general.controller");

const todoItemController = createCrudController(TodoItem);

const controller = {};

controller.toggleComplete = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await TodoItem.findById(id);

        if (!data) return sendError(res, 404,`Todo item with id ${id} not found`);

        data.is_completed = !data.is_completed;

        const response = await data.save();
      
        sendSuccess(
            res,
            200,
            `${TodoItem.modelName} with id ${id} updated successfully`,
            response
          );
  
    
    } catch (error) {
        debug(error);
        return sendError(res, 500, error);
    }
};

module.exports = {
    todoItemController,
    controller,
};
