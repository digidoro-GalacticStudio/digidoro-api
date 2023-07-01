const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pomodoroSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "New Pomodoro",
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sessions_completed: {
      type: Number,
      default: 0,
      min: 0,
    },
    total_sessions: {
      type: Number,
      default: 1,
      min: 1,
    },
    theme: {
      type: String,
      trim: true,
      default: "#FFFFFF",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pomodoro", pomodoroSchema);
