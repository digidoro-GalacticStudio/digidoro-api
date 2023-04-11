const debug = require("debug")("digidoro:note-controller");
const Note = require("../models/note.model");
const createCrudController = require("./general.controller");

const noteController = createCrudController(Note);

module.exports = noteController;
