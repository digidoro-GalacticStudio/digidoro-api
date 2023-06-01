const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoItemSchema = new Schema(
  {
    user_id:{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    theme: {
      type: String,
      trim: true,
      default: "#FFFFFF",
    },
    reminder: {
      type: Date,
    },
    is_completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TodoItem", todoItemSchema);
