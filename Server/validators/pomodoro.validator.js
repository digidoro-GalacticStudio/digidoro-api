const { body, param } = require("express-validator");

const createPomodoroValidator = [
  body("user_id")
    .optional()
    .isMongoId()
    .withMessage("user_id must be a non-empty ID"),
  body("sessions_completed")
    .optional()
    .isInt()
    .withMessage("sessions_completed must be Integer")
    .bail()
    .isInt({ min: 0 })
    .withMessage("sessions_completed must be greater than 1"),
  body("total_sessions")
    .optional()
    .isInt()
    .withMessage("total_sessions must be Integer")
    .bail()
    .isInt({ min: 1 })
    .withMessage("total_sessions must be greater than 1"),
  body("theme")
    .optional()
    .isHexColor()
    .withMessage("Color must be a valid hex color code"),
];

const findPomodoroByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("The ID required")
    .isMongoId()
    .withMessage("Invalid pomodoro ID"),
];

const changeThemeValidator = [
  body("theme")
    .notEmpty()
    .withMessage("The theme required")
    .bail()
    .isHexColor()
    .withMessage("Color must be a valid hex color code"),
];

module.exports = {
  createPomodoroValidator,
  findPomodoroByIdValidator,
  changeThemeValidator,
};
