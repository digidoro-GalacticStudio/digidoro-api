const debug = require("debug")("digidoro:note-controller");
const { sendError, sendSuccess } = require("../helpers/apiResponse");
const Note = require("../models/note.model");
const createCrudController = require("./general.controller");

const noteController = createCrudController(Note);

const controller = {};

controller.toggleTrash = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Note.findById(id);

    if (!data) sendError(res, 404, { error: "Not found" }, err);
    data.is_trashed = !data.is_trashed;

    const response = await data.save();

    sendSuccess(
      res,
      200,
      `${Note.modelName} with id ${id} updated successfully`,
      response
    );
  } catch (err) {
    debug(err);
    sendError(res, 500, { error: "Unexpected error" }, err);
  }
};

controller.getOwnBySearch = async (req, res) => {
  try {
    const { searchText, sortBy, order, page, limit, populateFields } =
      req.query;
    const userID = req.user._id;

    const conditions = {
      user_id: userID,
      $or: [
        { title: { $regex: searchText, $options: "i" } },
        { message: { $regex: searchText, $options: "i" } },
        { tags: { $regex: searchText, $options: "i" } },
        { theme: { $regex: searchText, $options: "i" } },
      ],
    };

    if (searchText === "true") {
      conditions.is_trashed = true;
    } else if (searchText === "false") {
      conditions.is_trashed = false;
    }

    const query = Note.find(conditions).sort({ [sortBy]: order });

    if (populateFields) {
      const fieldsArray = populateFields.split(",");
      fieldsArray.forEach((field) => query.populate(field));
    }

    const data = await query
      .skip((page - 1) * limit)
      .limit(limit * 1)
      .exec();

    const totalCount = await Note.countDocuments(conditions);

    sendSuccess(res, 200, `All Notes retrieved successfully`, data, totalCount);
  } catch (err) {
    debug(err);
    sendError(res, 500, err.message, err);
  }
};

module.exports = {
  noteController,
  controller,
};
