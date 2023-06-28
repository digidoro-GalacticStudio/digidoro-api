const debug = require("debug")("digidoro:folder-controller");
const Folder = require("../models/folder.model");
const Note = require("../models/note.model");
const createCrudController = require("./general.controller");
const { sendError, sendSuccess } = require("../helpers/apiResponse");

const folderController = createCrudController(Folder);

const controller = {};

controller.updateOwnById = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { id } = req.params;
    const { name, theme, notes_id } = req.body;

    const updatedData = await Folder.findById(id);
    if (!updatedData) {
      sendError(res, 404, `${Folder.modelName} with id ${id} not found`);
    }

    updatedData.name = name;
    updatedData.theme = theme;
    updatedData.notes_id = notes_id;

    const response = await updatedData.save();

    sendSuccess(
      res,
      200,
      `${Folder.modelName} with id ${id} updated successfully`,
      response
    );
  } catch (err) {
    debug(err);
    sendError(res, 500, err.message, err);
  }
};

controller.toggleItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { notes_id } = req.body;

    const data = await Folder.findById(id);

    if (!data)
      sendError(res, 404, `${Folder.modelName} with id ${id} not found`);

    const index = data.notes_id.indexOf(notes_id);

    if (index >= 0)
      data.notes_id = data.notes_id.filter((item) => !item.equals(notes_id));
    else data.notes_id = [...data.notes_id, notes_id];

    const response = await data.save();

    sendSuccess(
      res,
      200,
      `${Folder.modelName} with id ${id} updated successfully`,
      response
    );
  } catch (err) {
    debug(err);
    sendError(res, 500, err.message, err);
  }
};

controller.getNoteWithFolder = async (req, res) => {
  try {
    const noteId = req.params.id;

    const actualFolder = await Folder.findOne({ notes_id: noteId });

    const folders = await Folder.find();

    sendSuccess(res, 200, `All ${Folder.modelName} retrieved successfully`, {
      actualFolder,
      folders,
    });
  } catch (err) {
    debug(err);
    sendError(res, 500, err.message, err);
  }
};

controller.getNotesWithoutFolder = async (req, res) => {
  try {
    const { sortBy, order, page, limit, populateFields } = req.query;
    const userID = req.user._id;

    const notesWithFolder = await Folder.distinct("notes_id");

    let query = Note.find({ _id: { $nin: notesWithFolder }, user_id: userID });

    if (populateFields) {
      const fieldsArray = populateFields.split(",");
      fieldsArray.forEach((id) => (query = query.populate(id)));
    }

    const data = await query
      .skip((page - 1) * limit)
      .limit(limit * 1)
      .exec();

    sendSuccess(
      res,
      200,
      `All ${Folder.modelName} retrieved successfully`,
      data
    );
  } catch (err) {
    debug(err);
    sendError(res, 500, err.message, err);
  }
};

module.exports = {
  folderController,
  controller,
};
