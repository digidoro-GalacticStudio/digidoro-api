var express = require("express");
var router = express.Router();

const emailValidationController = require("../../controllers/emailRecuperation.controller");
const authMiddleware = require("../../middleware/auth.middleware");
const runValidations = require("../../validators/index.middleware");

router.post("/",
    emailValidationController.emailRecuperation
);

module.exports = router;