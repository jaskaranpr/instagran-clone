const express = require("express");

const router = express.Router();

const authentication = require("../middlewares/authenticate");
const Post = require("../models/posts.model");

const User = require("../models/user.model");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password").lean().exec();
    return res.status(200).send(users);
  } catch (err) {
    return res.status(400).send("Somthing went wrong");
  }
});

router.get("/find/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId })
      .populate({ path: "followers", select: { userId: 1, profile_image: 1 } })
      .select("-password")
      .lean()
      .exec();
    const posts = await Post.find({ user: user._id }).select("-password");

    const followings = await User.find({ followers: user._id }).lean().exec();
    if (user) return res.status(200).send({ user, posts, followings });
    else return res.status(200).send({ message: "User not found" });
  } catch (err) {
    return res.status(400).send("Somthing went wrong");
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);

    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send("Somthing went wrong");
  }
});

router.get("/get", authentication, async (req, res) => {
  try {
    const user = await User.findById(req.userId.userId)
      .select("-password")
      .lean()
      .exec();
    return res.status(200).send({
      user: {
        _id: user._id,
        userId: user.userId,
        name: user.name,
        mobile: user.mobile,
        profile_image: user.profile_image || "",
        bio: user.bio || "",
        saved: user.saved,
      },
    });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.get("/savedpost", authentication, async (req, res) => {
  try {
    const user = await User.findById(req.userId.userId)
      .populate("saved")
      .lean()
      .exec();
    return res.status(200).send({
      user: user,
      posts: user.saved.reverse(),
    });
  } catch (err) {
    return res.status(500).send({ err });
  }
});

router.post("/savepost", authentication, async (req, res) => {
  try {
    let user;
    let checkSaved = await User.findOne({
      _id: req.userId.userId,
      saved: req.body.postId,
    });

    if (checkSaved) {
      user = await User.updateOne(
        { _id: req.userId.userId },
        { $pull: { saved: req.body.postId } }
      )
        .lean()
        .exec();
    } else {
      user = await User.updateOne(
        { _id: req.userId.userId },
        {
          $push: { saved: req.body.postId },
        }
      )
        .lean()
        .exec();
    }
    return res.status(201).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("something went wrong");
  }
});

router.post("/:id/follow", authentication, async (req, res) => {
  try {
    let user;
    let checkFollow = await User.findOne({
      _id: req.params.id,
      followers: req.userId.userId,
    });
    if (checkFollow) {
      user = await User.updateOne(
        { _id: req.params.id },
        { $pull: { followers: req.userId.userId } }
      )
        .lean()
        .exec();
    } else {
      user = await User.updateOne(
        { _id: req.params.id },
        {
          $push: { followers: req.userId.userId },
        }
      )
        .lean()
        .exec();
    }
    return res.status(201).send(user);
  } catch (err) {
    console.log(err);
    return res.status(500).send("something went wrong");
  }
});

router.get("/suggestions", authentication, async (req, res) => {
  try {
    let users = await User.find({ followers: { $ne: req.userId.userId } })
      .limit(5)
      .lean()
      .exec();
    return res.status(200).send(users);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

router.get("/search/:userId", async (req, res) => {
  try {
    let regex = new RegExp(req.params.userId, "i");
    let users = await User.find({ $or: [{ userId: regex }, { name: regex }] })
      .select({ userId: 1, profile_image: 1, name: 1 })
      .lean()
      .exec();
    return res.status(200).send(users);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

router.get("/chatusers", authentication, async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId.userId } })
      .select({ userId: 1, profile_image: 1, name: 1 })
      .lean()
      .exec();
    return res.status(200).send(users);
  } catch (err) {
    res.status(500).send("something went wrong");
  }
});

module.exports = router;
