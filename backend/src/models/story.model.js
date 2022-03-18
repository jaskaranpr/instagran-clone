const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    caption: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("post", postSchema);
