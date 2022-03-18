const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: false, default: "" },
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
  ],
  bio: { type: String, required: false, default: "" },
  profile_image: {
    type: String,
    required: false,
    default:
      "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
  },
  saved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post",
      required: false,
    },
  ],
  story: { type: String, required: false },
  star: { type: String, required: false },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hashSync(this.password, 8);
  return next();
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("user", userSchema);
