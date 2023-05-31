const debug = require("debug")("digidoro:favorite-controller");
const { sendError, sendSuccess } = require("../helpers/apiResponse");
const FavoriteNotes = require("../models/favoriteNote.model");
const createCrudController = require("./general.controller");

const favoriteNoteController = createCrudController(FavoriteNotes);

const controller = {}


controller.updateOwnById = async (req, res) => {
    try {
      const { user_id } = req.user;
      const { id } = req.params;
      const { name, theme, notes_id } = req.body;
  
      const updatedData = await FavoriteNotes.findById(id);
      if (!updatedData) {
        sendError(res, 404, `${FavoriteNotes.modelName} with id ${id} not found`);
      }

    updatedData.notes_id = notes_id;

    const response = await updatedData.save();

    sendSuccess(
      res,
      200,
      `${FavoriteNotes.modelName} with id ${id} updated successfully`,
      response
    );
      
    } catch (err) {
      debug(err);
      sendError(res, 500, err.message, err);
    }
};

controller.toggleItem = async (req, res, next) => {
    try{
        const { id } = req.params;
        const { notes_id } = req.body;

        const data = await FavoriteNotes.findById(id);

        if(!data) sendError(res, 404, `${FavoriteNotes.modelName} with id ${id} not found`);

        const index = data.notes_id.indexOf(notes_id);

        if(index >= 0) data.notes_id = data.notes_id.filter(item => !item.equals(notes_id));
        else data.notes_id = [...data.notes_id, notes_id];

        const response = await data.save();

        sendSuccess(res, 200, `${FavoriteNotes.modelName} with id ${id} updated successfully`, response);

    } catch(err){
        debug(err);
        sendError(res, 500, err.message, err);
    }

}

module.exports = {
   favoriteNoteController,
    controller
};
