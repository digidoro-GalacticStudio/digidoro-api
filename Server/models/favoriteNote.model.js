const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteNoteSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
});

module.exports = mongoose.model("FavoriteNotes", favoriteNoteSchema);
