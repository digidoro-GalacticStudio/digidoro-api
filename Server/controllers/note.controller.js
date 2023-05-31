const debug = require("debug")("digidoro:note-controller");
const { sendError, sendSuccess } = require("../helpers/apiResponse");
const Note = require("../models/note.model");
const createCrudController = require("./general.controller");

const noteController = createCrudController(Note);

const controller = {}

controller.toggleTrash = async(req, res)=>{
    try{
        const { id } = req.params;

        const data = await Note.findById(id);

        if(!data) sendError(res, 404, {error: "Not found"}, err);
        data.is_trashed = !data.is_trashed;

        const response = await data.save();
      
        sendSuccess(
            res,
            200,
            `${Note.modelName} with id ${id} updated successfully`,
            response
          );
  
    } catch(err){
        debug(err);
        sendError(res, 500, {error: "Unexpected error"}, err)
    }
}

module.exports = {
    noteController,
    controller
};
