const debug = require("debug")("digidoro:todo-controller");
const Todo = require("../models/todo.model");
const createCrudController = require("./general.controller");
const { sendError, sendSuccess } = require("../helpers/apiResponse");

const todoController = createCrudController(Todo);

const controller = {}

controller.toggleItem = async (req, res) => {
    try {
      const { id } = req.params;
      const { item_id } = req.body;
     
      const data = await Todo.findById(id);

      if (!data) 
        sendError(res, 404, `${Todo.modelName} with id ${id} not found`)
    
      const index = data.items_id.indexOf(item_id);
        
      if(index >= 0) 
        data.items_id = data.items_id.filter(item => !item.equals(item_id));

      else data.items_id = [...data.items_id, item_id];

      const response = await data.save();
      
        sendSuccess(
          res,
          200,
          `${Todo.modelName} with id ${id} updated successfully`,
          response
        );
        
      } catch (err) {
        debug(err);
        sendError(res, 500, err.message, err);
      }
};

controller.updateOwnListItems = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = await Todo.findById(id);
    if(!updateData)
    sendError(res, 404, `${Todo.modelName} with id ${id} not found`);

    const data = await Todo.findByIdAndUpdate(id, {items_id: req.body.items_id}, {new: true});


    sendSuccess(
      res,
      200,
      `${Todo.modelName} with id ${id} updated successfully`,
      data
    );
  }
     catch (err) {
    debug(err);
    sendError(res, 500, err.message, err);
  }
};

module.exports = {
  todoController,
  controller
};
