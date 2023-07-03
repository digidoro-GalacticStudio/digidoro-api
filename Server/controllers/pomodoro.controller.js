const debug = require("debug")("digidoro:pomodoro-controller");
const { sendError, sendSuccess } = require("../helpers/apiResponse");
const Pomodoro = require("../models/pomodoro.model");
const createCrudController = require("./general.controller");

const pomodoroController = createCrudController(Pomodoro);

pomodoroController.updateSessionsCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.user.id;

    const pomodoro = await Pomodoro.findOne({
      _id: id,
      user_id: userId,
    });
    if (!pomodoro) {
      return res.status(404).json({ error: "Pomodoro not found" });
    }

    pomodoro.sessions_completed += 1;

    await pomodoro.save();

    sendSuccess(res, 200, `Sessions completed updated successfully`);
  } catch (err) {
    debug(err);
    sendError(res, 500, err.message, err);
  }
};

module.exports = pomodoroController;
