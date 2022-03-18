const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: { type: String, required: true },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("comment", commentSchema);
