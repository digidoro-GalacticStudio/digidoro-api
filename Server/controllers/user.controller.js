const debug = require("debug")("digidoro:user-controller");
const User = require("../models/user.model");
const createCrudController = require("./general.controller");

const userController = createCrudController(User);

module.exports = userController;
