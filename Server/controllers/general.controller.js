const debug = require("debug")("digidoro:generic-controller");
const { sendSuccess, sendError } = require("../helpers/apiResponse");

const createController = (model) => {
  // Define the CRUD controller object
  const crudController = {};

  crudController.create = async (req, res) => {
    try {
      const data = await model.create(req.body);
      sendSuccess(res, 201, `${model.modelName} created successfully`, data);
    } catch (err) {
      debug(err);
      sendError(res, 500, err.message, err);
    }
  };

  crudController.getAll = async (req, res) => {
    try {
      const data = await model.find({});
      sendSuccess(
        res,
        200,
        `All ${model.modelName} retrieved successfully`,
        data
      );
    } catch (err) {
      debug(err);
      sendError(res, 500, err.message, err);
    }
  };

  crudController.getById = async (req, res) => {
    try {
      const { id } = req.params;

      const data = await model.findById(id);

      if (!data) {
        sendError(res, 404, `${model.modelName} with id ${id} not found`);
      } else {
        sendSuccess(
          res,
          200,
          `${model.modelName} with id ${id} retrieved successfully`,
          data
        );
      }
    } catch (err) {
      debug(err);
      sendError(res, 500, err.message, err);
    }
  };

  crudController.updateById = async (req, res) => {
    try {
      const { id } = req.params;

      const updatedData = await model.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedData) {
        sendError(res, 404, `${model.modelName} with id ${id} not found`);
      } else {
        sendSuccess(
          res,
          200,
          `${model.modelName} with id ${id} updated successfully`,
          updatedData
        );
      }
    } catch (err) {
      debug(err);
      sendError(res, 500, err.message, err);
    }
  };

  crudController.deleteById = async (req, res) => {
    try {
      const { id } = req.params;

      const deletedData = await model.findByIdAndDelete(id);

      if (!deletedData) {
        sendError(res, 404, `${model.modelName} with id ${id} not found`);
      } else {
        sendSuccess(
          res,
          200,
          `${model.modelName} with id ${id} deleted successfully`,
          deletedData
        );
      }
    } catch (err) {
      debug(err);
      sendError(res, 500, err.message, err);
    }
  };

  // Return the CRUD controller object
  return crudController;
};

// Export the function for use in other modules
module.exports = createController;
