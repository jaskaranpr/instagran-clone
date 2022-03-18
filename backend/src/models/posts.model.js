const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    file_type: { type: String, required: true },
    caption: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: false,
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
        required: false,
      },
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tag",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("post", postSchema);
