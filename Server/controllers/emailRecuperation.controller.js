const nodemailer = require("nodemailer");
const debug = require("debug")("digidoro:emailValidation-controller");
//const { config } = require("../config/nodemailer");
const { sendSuccess, sendError } = require("../helpers/apiResponse");

const favoriteNoteController = {};


const config = {

    service: "gmail",
    host: "smt.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user: process.env.DIGIDORO_EMAIL || "galactic.studio23@gmail.com",
        pass: process.env.DIGIDORO_PASS || ""

    }
    
}

favoriteNoteController.emailRecuperation = async(req, res) =>{
    try{
        const from = process.env.DIGIDORO_EMAIL || "galactic.studio23@gmail.com";
        const subject = "DIGIDORO account recovery"
        const text = `Hi there, keep on using DIGIDORO to help on your time. Click on the following Link --> ${"link"} to recover your account`
        const { email } = req.body;
        const data = {
            from,
            email,
            subject,
            text,
        }
        const transport = nodemailer.createTransport(config);
        transport.sendMail(data, (err, info) =>{
            if(err) debug({"error": err})
            else debug(info.response)
        });
        transport.close();
    
        sendSuccess(res, 201, `send successfully`, data);
    
    } catch (err) {
        debug(err);
        sendError(res, 500, err.message, err);
    }

}

module.exports = favoriteNoteController;