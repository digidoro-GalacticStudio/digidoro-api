var express = require("express");
var router = express.Router();

const { folderController, controller} = require("../../controllers/folder.controller");

const ROLES = require("../../data/roles.constant.json");
const { authentication, authorization } = require("../../middleware/auth.middleware");
const folderValidators = require("../../validators/folder.validators");
const runValidations = require("../../validators/index.middleware");


//user  
router.get("/own", 
  authentication,
  authorization(ROLES.USER),
  runValidations,
  folderController.getAllOwn
);

router.post(
  "/own",
  authentication,
  authorization(ROLES.USER),
  folderValidators.createFolderValidator,
  runValidations,
  folderController.createOwn
);

router.patch(
  "/own/toggleItems/:id",
  authentication,
  authorization(ROLES.USER),
  folderValidators.findFolderByIdValidator,
  folderValidators.toggleFolderItemsValidator,
  runValidations,
  controller.toggleItem
);
router.patch(
  "/own/:id",
  authentication,
  authorization(ROLES.USER),
  folderValidators.findFolderByIdValidator,
  folderValidators.createFolderValidator,
  runValidations,
  controller.updateOwnById
);

router.delete(
  "/own/:id",
  authentication,
  authorization(ROLES.USER),
  folderValidators.findFolderByIdValidator,
  runValidations,
  folderController.deleteById
);
//admin
router.get("/", folderController.getAll);

router.get(
  "/:id",
  folderValidators.findFolderByIdValidator,
  runValidations,
  folderController.getById
);

router.post(
  "/",
  folderValidators.createFolderValidator,
  runValidations,
  folderController.create
);

router.patch(
  "/:id",
  folderValidators.findFolderByIdValidator,
  folderValidators.createFolderValidator,
  runValidations,
  folderController.updateById
);

router.delete(
  "/:id",
  folderValidators.findFolderByIdValidator,
  runValidations,
  folderController.deleteById
);

module.exports = router;
