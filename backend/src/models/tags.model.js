const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: { required: true },
});

module.exports = mongoose.model("tag", tagSchema);
