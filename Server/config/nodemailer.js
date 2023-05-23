const nodemailer = require("nodemailer");
const debug = require("debug")("digidoro:nodemailer");

const config =()=>{
    return {
        service: "gmail",
        host: "smt.gmail.com",
        port: 587,
        secure: false,
        auth:{
            user: process.env.DIGIDORO_EMAIL || "galactic.studio23@gmail.com",
            pass: process.env.DIGIDORO_PASS || ""
        }
    }
}
module.exports = config;
