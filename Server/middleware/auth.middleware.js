const { verifyToken } = require("../tools/jwt.tools");
const debug = require("debug")("digidoro:auth-middleware");
const User = require("../models/user.model");
const ROLES = require("../data/roles.constant.json");
const { sendSuccess, sendError } = require("../helpers/apiResponse");

const middlewares = {};

const tokenPrefix = "Digodoro_Bearer";
//return sendError(res, 401, {error: "Unauthorized"})

middlewares.authentication = async(req, res, next)=>{
    try{
        
        //verify if authorization has been sent
        const { authorization } = req.headers;
        if(!authorization) return sendError(res, 401, {error: "Unauthorized"});
        
        //verify token validation
        const [prefix, token] = authorization.split(" ");
        if(prefix != tokenPrefix) return sendError(res, 401, {error: "Unauthorized"});
        if(!token) return sendError(res, 401, {error: "Unauthorized"});
        
        const tokenObj = verifyToken(token);
        if(!tokenObj) return sendError(res, 401, {error: "Unauthorized"});
        
        const { userID } = tokenObj;
        
        //verify user exists
        const user = await User.findById(userID);
        if(!user) return sendError(res, 401, {error: "Unauthorized"});
        
        //verify token belongs to user
        const isTokenValid = user.tokens.includes(token);
        if(!isTokenValid) return sendError(res, 401, {error: "Unauthorized"});
        
        req.user = user;
        req.token = token;
        
        next();
    }
    catch(error){
        debug(error);
        sendError(res, 500, error.message, error);
    }
}

middlewares.authorization = (rolApp = ROLES.USER)=>{
    return(req, res, next)=>{
        
        try{
            
            //authentication process succeeded
            const {roles=[]} = req.user;
            
            //verify user roles exists
            const rolIndex = roles.findIndex(rol=>(rol === rolApp));
            
            //filter
            if(rolIndex < 0) return sendError(res, 403, {error: "Unauthorized"});

            next();
            
        }
        catch(error){
            debug(error);
            return sendError(res, 500, {error: "Unexpected server error"}, error);
            
        }
    }
}
module.exports = middlewares;

