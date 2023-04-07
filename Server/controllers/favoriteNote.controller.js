const debug = require("debug")("digidoro:favorite-controller");
const FavoriteNotes = require("../models/favoriteNote.model");
const createCrudController = require("./general.controller");

const favoriteNoteController = createCrudController(FavoriteNotes);

module.exports = favoriteNoteController;
