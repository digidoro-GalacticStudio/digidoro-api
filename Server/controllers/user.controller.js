const debug = require("debug")("digidoro:user-controller");
const { sendError, sendSuccess } = require("../helpers/apiResponse");
const { createToken, verifyToken } = require("../tools/jwt.tools");

const User = require("../models/user.model");
const createCrudController = require("./general.controller");

const authController = {};
const userController = createCrudController(User);

//TODO: continue registration steps
authController.register = async(req, res)=>{
    try{
        //checking email has not been used
        const { email } = req.body;
        const user = await User.findOne( {email: email} );
        if(user) return sendError(res, 409, {error: "This email is already registered"});

        const data = await User.create({
            ...req.body,
            roles: [ROLES.USER],
        })

        sendSuccess(res, 201, `${User.modelName} created successfully`, data);
    }
    catch(error){
        debug(error);
        return sendError(res, 500, {error: "Unexpected error"}, error);
    }
}

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
    const token = createToken(user._id);

    //verify tokens allow 5 active sessions
    user.tokens = [
      token,
      ...user.tokens.filter((_token) => verifyToken(_token).splice(0, 4)),
    ];

    //saving token and user
    await user.save();

    return sendSuccess(res, 200, "successfully logged in");
  } catch (error) {
    debug(error);
    return sendError(res, 500, { error: "Unexpected error" }, error);
  }
};

module.exports = {
  authController,
  userController,
};
