var express = require("express");
var router = express.Router();

const { favoriteNoteController, controller} = require("../../controllers/favoriteNote.controller");

const ROLES = require("../../data/roles.constant.json");
const favoriteValidators = require("../../validators/favoriteNote.validators");
const { authentication, authorization } = require("../../middleware/auth.middleware");
const runValidations = require("../../validators/index.middleware");

//user

router.get(
  "/own",
  authentication,
  authorization(ROLES.USER),
  runValidations,
  favoriteNoteController.getAllOwn
);

router.post(
  "/own",
  authentication,
  authorization(ROLES.USER),
  favoriteValidators.createFavoriteNoteValidator,
  runValidations,
  favoriteNoteController.createOwn
);

router.patch(
  "/own/:id",
  authentication, 
  authorization(ROLES.USER),
  favoriteValidators.findFavoriteNoteByIdValidator,
  favoriteValidators.createFavoriteNoteValidator,
  runValidations,
  controller.updateOwnById
);

router.patch(
  "/own/toggleFav/:id",
  authentication,
  authorization(ROLES.USER),
  favoriteValidators.findFavoriteNoteByIdValidator,
  favoriteValidators.toggleFavoriteNoteValidator,
  runValidations,
  controller.toggleItem
);

router.delete(
  "/own/:id",
  authentication,
  authorization(ROLES.USER),
  favoriteValidators.findFavoriteNoteByIdValidator,
  runValidations,
  favoriteNoteController.deleteOwn
);


//admin
router.get("/", favoriteNoteController.getAllSorted);

router.get(
  "/:id",
  favoriteValidators.findFavoriteNoteByIdValidator,
  runValidations,
  favoriteNoteController.getById
);

router.post(
  "/",
  favoriteValidators.createFavoriteNoteValidator,
  runValidations,
  favoriteNoteController.create
);

router.patch(
  "/:id",
  favoriteValidators.findFavoriteNoteByIdValidator,
  favoriteValidators.createFavoriteNoteValidator,
  runValidations,
  favoriteNoteController.updateById
);

router.delete(
  "/:id",
  favoriteValidators.findFavoriteNoteByIdValidator,
  runValidations,
  favoriteNoteController.deleteById
);

module.exports = router;
