const debug = require("debug")("digidoro:user-controller");
const { sendError, sendSuccess } = require("../helpers/apiResponse");
const { generateToken, verifyToken } = require("../tools/jwt.tools");
const ROLES = require("../data/roles.constant.json");

const User = require("../models/user.model");
const FavoriteNotes = require("../models/favoriteNote.model");
const createCrudController = require("./general.controller");

const authController = {};
const userController = createCrudController(User);

authController.register = async (req, res) => {
  try {
    //checking email has not been used
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (user)
      return sendError(res, 409, { error: "This email is already registered" });

    const data = await User.create({
      ...req.body,
      roles: [ROLES.USER],
    });

    const favoriteNotesData = {
      user_id: data.id,
      notes_id: [],
    };
    const favoriteNotes = await FavoriteNotes.create(favoriteNotesData);

    sendSuccess(res, 201, `${User.modelName} created successfully`, data);
  } catch (error) {
    debug(error);
    return sendError(res, 500, { error: "Unexpected error" }, error);
  }
};

authController.singin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //verify user does exists
    const user = await User.findOne({
      email: email,
    });
    if (!user) return sendError(res, 401, { error: "User does not exist" });

    //checking passwords
    if (!user.comparePassword(password))
      return sendError(res, 401, { error: "Incorrect password" });

    //allow logging
    const token = generateToken(user._id);

    //verify tokens allow 5 active sessions
    user.tokens = [
      token,
      ...user.tokens.filter((_token) => verifyToken(_token)).splice(0, 4),
    ];

    //saving token and user
    await user.save();

    let data = {
      id: user._id,
      token: token,
      username: user.username,
      email: user.email,
      roles: user.roles,
    };

    return sendSuccess(res, 200, "successfully logged in", data);
  } catch (error) {
    debug(error);
    return sendError(res, 500, { error: "Unexpected error" }, error);
  }
};

authController.getPremium = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);
    if (!user)
      return sendError(res, 404, { error: "User does not exist" }, error);

    user.roles = [...user.roles, ROLES.PREMIUM];

    const upgraded = await user.save();

    return sendSuccess(res, 200, "successfully upgraded", upgraded);
  } catch (error) {
    debug(error);
    return sendError(res, 500, { error: "Unexpected error" }, error);
  }
};

authController.recoveryPassword = async (req, res) => {
  try {
    const { email, recoveryCode, newPassword } = req.body;

    // Verify user exists and the recovery code is valid
    const user = await User.findOne({
      email: email,
      recoveryCode: recoveryCode,
    });

    if (!user) {
      return sendError(res, 401, { error: "Invalid recovery code" });
    }

    // Verify if recovery code has expired
    if (user.recoveryCodeExpiresAt < new Date()) {
      return sendError(res, 401, { error: "Recovery code has expired" });
    }

    // Update the user's password and clear the recovery code
    user.password = newPassword;
    user.recoveryCode = undefined;
    user.recoveryCodeExpiresAt = undefined;
    await user.save();

    return sendSuccess(res, 200, "Password changed successfully");
  } catch (error) {
    debug(error);
    return sendError(res, 500, { error: "Unexpected error" }, error);
  }
};

authController.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user._id;

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return sendError(res, 404, { error: "User not found" });
    }

    // Check if the old password is correct
    if (!user.comparePassword(oldPassword)) {
      return sendError(res, 401, { error: "Incorrect old password" });
    }

    // Check if the new password is the same as the old password
    if (oldPassword === newPassword) {
      return sendError(res, 400, {
        error: "New password must be different from the old password",
      });
    }

    // Update the password
    user.password = newPassword;
    await user.save();

    return sendSuccess(res, 200, "Password changed successfully");
  } catch (error) {
    debug(error);
    return sendError(res, 500, { error: "Unexpected error" });
  }
};

userController.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select(
      "firstname lastname username profile_pic level daily_score weekly_score monthly_score total_score date_birth phone_number"
    );

    if (!user) {
      return sendError(res, 404, { error: "User not found" });
    }

    return sendSuccess(res, 200, "Current user retrieved successfully", user);
  } catch (error) {
    debug(error);
    return sendError(res, 500, { error: "Unexpected error" }, error);
  }
};

const allowedFields = [
  "firstname",
  "lastname",
  "username",
  "date_birth",
  "phone_number",
];

authController.updateUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedFields = {};

    // Validate allowed fields and add them to the updated fields object
    for (const field in req.body) {
      if (allowedFields.includes(field)) {
        updatedFields[field] = req.body[field];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    });

    if (!updatedUser) {
      return sendError(res, 404, { error: "User not found" });
    }

    sendSuccess(res, 200, "User updated successfully", updatedUser);
  } catch (error) {
    debug(error);
    sendError(res, 500, { error: "Unexpected error" }, error);
  }
};

userController.getTopUsersByScore = async (req, res) => {
  try {
    const sortByFields = [
      "daily_score",
      "weekly_score",
      "monthly_score",
      "total_score",
    ];

    const sortBy = req.query.sortBy || "total_score";
    const order = req.query.order || "desc";

    if (!sortByFields.includes(sortBy)) {
      return sendError(res, 400, { error: "Invalid sortBy field" });
    }

    const users = await User.find()
      .sort({ [sortBy]: order })
      .limit(5)
      .select(
        "firstname username profile_pic level daily_score weekly_score monthly_score total_score"
      )
      .exec();

    return sendSuccess(res, 200, "Top users retrieved successfully", users);
  } catch (error) {
    debug(error);
    return sendError(res, 500, { error: "Unexpected error" }, error);
  }
};

userController.getUserInfoRanking = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select(
      "firstname username profile_pic level daily_score weekly_score monthly_score total_score"
    );

    if (!user) {
      return sendError(res, 404, "User not found");
    }

    return sendSuccess(
      res,
      200,
      "User information retrieved successfully",
      user
    );
  } catch (error) {
    console.error(error);
    return sendError(res, 500, "Unexpected error");
  }
};

userController.updateScores = async (req, res) => {
  try {
    const { score } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) {
      return sendError(res, 404, { error: "User not found" });
    }

    user.daily_score += score;
    user.weekly_score += score;
    user.monthly_score += score;
    user.total_score += score;

    await user.save();

    return sendSuccess(res, 200, "Scores updated successfully");
  } catch (error) {
    debug(error);
    return sendError(res, 500, { error: "Unexpected error" });
  }
};

module.exports = {
  authController,
  userController,
};
