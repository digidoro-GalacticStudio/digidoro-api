const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pomodoroSchema = new Schema(
  {
    pomodoro: {
      type: Number,
      required: true,
      min: 25,
    },
    break: {
      type: Number,
      required: true,
      min: 5,
    },
    long_break: {
      type: Number,
      required: true,
      min: 15,
    },
    break_pomodoro: {
      type: Number,
      required: true,
    },
    pomodoro_day: {
      type: Number,
      required: true,
    },
    theme: {
      type: String,
      trim: true,
      default: "#FFFFFF",
    },
    reminder: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pomodoro", pomodoroSchema);
