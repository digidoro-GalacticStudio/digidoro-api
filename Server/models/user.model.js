const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const crypto = require("crypto");
const debug = require("debug")("digidoro:user-model");

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    phone_number: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password_hash: {
      type: String,
      trim: true,
      required: true,
    },
    date_birth: {
      type: Date,
      required: true,
    },
    roles: {
      type: [String],
      trim: true,
      default: [],
    },
    salt: {
      type: String,
    },
    tokens: {
      type: [String],
      default: [],
    },
    profile_pic: {
      type: String,
      trim: true,
      default: "https://i.imgur.com/GvsgVco.jpeg",
    },
    level: {
      type: String,
      trim: true,
      default: "Dreamer",
    },
    daily_score: {
      type: Number,
      default: 0,
    },
    weekly_score: {
      type: Number,
      default: 0,
    },
    monthly_score: {
      type: Number,
      default: 0,
    },
    total_score: {
      type: Number,
      default: 0,
    },
    recoveryCode: {
      type: String,
    },
    recoveryCodeExpiresAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.methods = {
  encryptedPassword: function (password) {
    if (!password) return "";

    try {
      const encryptedPassword = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");

      return encryptedPassword;
    } catch (error) {
      debug({ error });
      return "";
    }
  },

  makeSalt: function () {
    return crypto.randomBytes(16).toString("hex");
  },

  comparePassword: function (password) {
    return this.password_hash === this.encryptedPassword(password);
  },
};

userSchema.virtual("password").set(function (password) {
  if (!password) return;
  this.salt = this.makeSalt();
  this.password_hash = this.encryptedPassword(password);
});

module.exports = mongoose.model("User", userSchema);
