var express = require("express");
var router = express.Router();

const { noteController, controller} = require("../../controllers/note.controller");

const noteValidators = require("../../validators/note.validators");
const runValidations = require("../../validators/index.middleware");
const ROLES = require("../../data/roles.constant.json");
const authMiddleware = require("../../middleware/auth.middleware");


//user
router.get("/own", 
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  runValidations,
  noteController.getAllOwn
);

router.post(
  "/own",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER), 
  noteValidators.createNoteValidator,
  runValidations,
  noteController.createOwn
);

router.patch(
  "/own/toggleTrash/:id",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  noteValidators.findNoteByIdValidator,
  runValidations,
  controller.toggleTrash
);

router.patch(
  "/own/:id",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  noteValidators.findNoteByIdValidator,
  noteValidators.createNoteValidator,
  runValidations,
  noteController.updateById
);


router.delete(
  "/own/:id",
  authMiddleware.authentication,
  authMiddleware.authorization(ROLES.USER),
  noteValidators.findNoteByIdValidator,
  runValidations,
  noteController.deleteById
);


//admin
router.get("/", noteController.getAllSorted);

router.get(
  "/:id",

  noteValidators.findNoteByIdValidator,
  runValidations,
  noteController.getById
);

router.patch(
  "/:id",
  noteValidators.findNoteByIdValidator,
  noteValidators.createNoteValidator,
  runValidations,
  noteController.updateById
);

router.delete(
  "/:id",
  noteValidators.findNoteByIdValidator,
  runValidations,
  noteController.deleteById
);


module.exports = router;
