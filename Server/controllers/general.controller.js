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
      const { populateFields } = req.query;
      const query = model.find({});

      if (populateFields) {
        const fieldsArray = populateFields.split(",");
        fieldsArray.forEach((id) => query.populate(id));
      }

      const data = await query.exec();

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
      const { populateFields } = req.query;
      const query = model.findById(id);

      if (populateFields) {
        const fieldsArray = populateFields.split(",");
        fieldsArray.forEach((id) => query.populate(id));
      }

      const data = await query.exec();

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

  crudController.getAllSorted = async (req, res) => {
    try {
      const { sortBy, order, page, limit, populateFields } = req.query;

      const query = model.find({}).sort({ [sortBy]: order });

      if (populateFields) {
        const fieldsArray = populateFields.split(",");
        fieldsArray.forEach((field) => query.populate(field));
      }
      const data = await query
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();

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
