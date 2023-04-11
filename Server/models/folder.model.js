const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const folderSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    theme: {
      type: String,
      trim: true,
      default: "#FFFFFF",
    },
    notes_id: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Note",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Folder", folderSchema);
