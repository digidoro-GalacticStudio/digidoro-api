const nodemailer = require("nodemailer");
const debug = require("debug")("digidoro:emailValidation-controller");
//const { config } = require("../config/nodemailer");
const { sendSuccess, sendError } = require("../helpers/apiResponse");

const favoriteNoteController = {};


const config = {

    service: "gmail",
    host: "smt.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: process.env.DIGIDORO_EMAIL || "galactic.studio23@gmail.com",
        pass: process.env.DIGIDORO_PASSWORD || ""

    }
}

favoriteNoteController.emailRecuperation = async(req, res) =>{
    try{

        //email content fields
        const from = process.env.DIGIDORO_EMAIL || "galactic.studio23@gmail.com";
        const subject = "DIGIDORO account recovery"
        const { email } = req.body;
        const HTML = '<html> <body> <br> <h1>Hey there!</h1> <p> This is the link you were waiting for</p> </body> </html>';
        
        const data = {
            from: from,
            to: email,
            subject: subject,
            html: HTML
        }
        const transporter = nodemailer.createTransport(config);
        transporter.sendMail(data, (err, info) =>{
            if(err) debug({"error": err})
            else debug(info.response)
        });
        transporter.close();
    
        sendSuccess(res, 201, `send successfully`, data);
    
    } catch (err) {
        debug(err);
        sendError(res, 500, err.message, err);
    }

}

module.exports = favoriteNoteController;