const debug = require("debug")("digidoro:folder-controller");
const Folder = require("../models/folder.model");
const createCrudController = require("./general.controller");

const folderController = createCrudController(Folder);

module.exports = folderController;
