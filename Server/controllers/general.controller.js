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

  //controllers for users after registration and login
  crudController.getAllOwn = async (req, res) => {
    try {
      const { sortBy, order, page, limit, tags, populateFields, ...filters } =
        req.query;
      const userID = req.user._id;

      const conditions = {
        user_id: userID,
        ...(Object.keys(filters).length > 0 ? filters : {}), // Add filters if they exist
      };

      if (tags) {
        conditions.tags = { $in: tags.split(",") };
      }

      const regexFilters = {};
      for (const key in conditions) {
        if (
          //If the key is a Boolean
          (key === "is_trashed" && conditions[key] === "true") ||
          conditions[key] === "false"
        ) {
          regexFilters[key] = conditions[key];
        } else if (typeof conditions[key] === "string") {
          // If the key is a string
          regexFilters[key] = new RegExp(conditions[key], "i");
        } else {
          //If the key is a ObjectId
          regexFilters[key] = conditions[key];
        }
      }

      const query = model.find(regexFilters).sort({ [sortBy]: order });

      if (populateFields) {
        const fieldsArray = populateFields.split(",");
        fieldsArray.forEach((field) => query.populate(field));
      }

      const data = await query
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .exec();

      const totalCount = await model.countDocuments(regexFilters);

      sendSuccess(
        res,
        200,
        `All ${model.modelName} retrieved successfully`,
        data,
        totalCount
      );
    } catch (err) {
      debug(err);
      sendError(res, 500, err.message, err);
    }
  };

  crudController.getOwnById = async (req, res) => {
    try {
      const { id } = req.params;
      const { populateFields } = req.query;
      const userID = req.user._id;

      const query = model.findOne({ _id: id, user_id: userID });

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

  crudController.deleteOwn = async (req, res) => {
    try {
      const { id } = req.user;

      const deletedData = await model.findByIdAndDelete(id);

      if (!deletedData)
        return sendError(
          res,
          404,
          `${model.modelName} with id ${id} not found`
        );

      sendSuccess(
        res,
        200,
        `${model.modelName} with id ${id} deleted successfully`,
        deletedData
      );
    } catch (err) {
      debug(err);
      sendError(res, 500, err.message, err);
    }
  };

  crudController.updateOwnById = async (req, res) => {
    try {
      const { id } = req.user;

      const updatedData = await model.create(id, req.body, {
        new: true,
      });

      if (!updatedData)
        return sendError(
          res,
          404,
          `${model.modelName} with id ${id} not found`
        );

      sendSuccess(
        res,
        200,
        `${model.modelName} with id ${id} updated successfully`
      );
    } catch (err) {
      debug(err);
      sendError(res, 500, err.message, err);
    }
  };

  crudController.createOwn = async (req, res) => {
    try {
      const { id } = req.user;

      req.body.user_id = id;

      const createOwn = await model.create(req.body);
      sendSuccess(
        res,
        200,
        `${model.modelName} with id ${id} created successfully`,
        createOwn
      );
    } catch (err) {
      debug(err);
      sendError(res, 500, err.message, err);
    }
  };

  //change color theme
  crudController.changeTheme = async (req, res) => {
    try {
      const { id } = req.params;

      const updated = await model.findByIdAndUpdate(id, {
        theme: req.body.theme,
      });
      if (!updated)
        return sendError(
          res,
          404,
          `${model.modelName} with id ${id} not found`
        );

      return sendSuccess(
        res,
        200,
        `The theme of the ${model.modelName} with id ${id} updated successfully`,
        updated
      );
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
