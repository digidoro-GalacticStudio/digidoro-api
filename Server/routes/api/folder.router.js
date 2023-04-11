var express = require("express");
var router = express.Router();

const folderController = require("../../controllers/folder.controller");

const folderValidators = require("../../validators/folder.validators");
const runValidations = require("../../validators/index.middleware");

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
