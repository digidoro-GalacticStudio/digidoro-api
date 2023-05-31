const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pomodoroSchema = new Schema(
  {
    name:{
      type: String,
      trim: true,
      default: "New Pomodoro"
    },
    user_id:{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    pomodoro: {
      type: Number,
      default: 25,
      min: 1,
    },
    break: {
      type: Number,
      default: 5,
      min: 1,
    },
    long_break: {
      type: Number,
      default: 15,
      min: 1,
    },
    break_pomodoro: {
      type: Number,
      default: 4,
      min: 1,
    },
    pomodoro_day: {
      type: Number,
      default: 8,
      min: 1,
    },
    theme: {
      type: String,
      trim: true,
      default: "#FFFFFF",
    },
    reminder: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pomodoro", pomodoroSchema);
