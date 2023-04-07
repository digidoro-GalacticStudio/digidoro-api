const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
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
    profile_pic: {
      type: String,
      trim: true,
      default: "https://i.imgur.com/GvsgVco.jpeg",
    },
    point: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
