const { body, param } = require("express-validator");

const createPomodoroValidator = [
  body("user_id")
  .optional()
  .isMongoId()
  .withMessage("user_id must be a non-empty ID"),
  body("pomodoro")
    .optional()
    .isInt()
    .withMessage("pomodoro must be Integer")
    .bail()
    .isInt({ min: 1 })
    .withMessage("pomodoro must be greater than 1"),
  body("break")
    .optional()
    .isInt()
    .withMessage("break must be Integer")
    .bail()
    .isInt({ min: 1 })
    .withMessage("break must be greater than 1"),
  body("long_break")
    .optional()
    .isInt()
    .withMessage("long_break must be Integer")
    .bail()
    .isInt({ min: 1 })
    .withMessage("long_break must be greater than 1"),
  body("break_pomodoro")
    .optional()
    .isInt()
    .withMessage("break_pomodoro must be Integer")
    .bail()
    .isInt({ min: 1 })
    .withMessage("break_pomodoro must be greater than 1"),
  body("pomodoro_day")
    .optional()
    .isInt()
    .withMessage("pomodoro_day must be Integer")
    .bail()
    .isInt({ min: 1 })
    .withMessage("pomodoro_day must be greater than 1"),
  body("theme")
    .optional()
    .isHexColor()
    .withMessage("Color must be a valid hex color code"),
  body("reminder")
    .optional()
    .isBoolean()
    .withMessage("reminder must be Boolean"),
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
