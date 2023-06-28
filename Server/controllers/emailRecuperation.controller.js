const nodemailer = require("nodemailer");
const debug = require("debug")("digidoro:emailValidation-controller");
const User = require("../models/user.model");
const { sendSuccess, sendError } = require("../helpers/apiResponse");
const crypto = require("crypto");

const favoriteNoteController = {};

const config = {
  service: "gmail",
  host: "smt.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.DIGIDORO_EMAIL || "galactic.studio23@gmail.com",
    pass: process.env.DIGIDORO_PASSWORD || "",
  },
};

favoriteNoteController.emailRecuperation = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return sendError(res, 404, "User with that email does not exist");
    }

    // Generate a random 8-digit recovery code
    const recoveryCode = crypto.randomInt(10000000, 99999999).toString();

    // Update user's recovery code and expiration time
    user.recoveryCode = recoveryCode;
    user.recoveryCodeExpiresAt = new Date(Date.now() + 30 * 60 * 1000); // Set expiration time to 30 minutes from now
    await user.save();

    // Email content fields
    const from = process.env.DIGIDORO_EMAIL || "galactic.studio23@gmail.com";
    const subject = "DIGIDORO account recovery";

    // HTML template
    const HTML = `
      <html>
        <head>
          <style>
            .container {
              background-color: #f2f2f2;
              padding: 20px;
              text-align: center;
            }
            .content {
              padding: 20px;
            }
            .banner {
              background-color: #f2f2f2;
              padding: 20px;
              text-align: center;
            }
            .logo{ 
              width: 170px;
            }
          </style>
        </head>
        <body>
          <div class="banner">
            <img src="https://i.imgur.com/y9ikFzi.png" alt="Banner Image" class="logo">
          </div>
          <div class="container">
            <h1>DIGIDORO Account Recovery</h1>
            <p>Hi ${user.firstname},</p>
            <p>We have received a request to reset your account password.</p>
            <p>Your recovery code is:</p>
            <h2 id="recovery-code">${recoveryCode}</h2>
            <p>Please use this code to reset your password within the next 30 minutes.</p>
          </div>
        </body>
      </html>
    `;

    const data = {
      from: from,
      to: email,
      subject: subject,
      html: HTML,
    };

    const transporter = nodemailer.createTransport(config);
    transporter.sendMail(data, (err, info) => {
      if (err) debug({ error: err });
      else debug(info.response);
    });
    transporter.close();

    sendSuccess(res, 201, "Recovery code sent successfully", data);
  } catch (err) {
    debug(err);
    sendError(res, 500, err.message, err);
  }
};

module.exports = favoriteNoteController;
