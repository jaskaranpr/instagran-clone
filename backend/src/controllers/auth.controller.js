require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const newToken = (userId) => {
  return jwt.sign({ userId }, process.env.jwtkey);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ userId: req.body.userId }).lean().exec();

    if (user)
      return res
        .status(400)
        .send({ message: "User with that userId already exists" });

    user = await User.create(req.body);
    console.log(user);
    const token = newToken(user["_id"]);

    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    let user = await User.findOne({ userId: req.body.userId });

    if (!user) return res.status(400).send({ message: " userId is incorrect" });

    const match = user.checkPassword(req.body.password);

    if (!match)
      return res.status(400).send({ message: "Password is incorrect" });

    const token = newToken(user["_id"]);
    return res.status(201).send({ user, token });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { register, login };
