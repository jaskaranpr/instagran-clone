const express = require("express");

const router = express.Router();

const Post = require("../models/posts.model");

const User = require("../models/user.model");

const Comment = require("../models/comments.model");

const authentication = require("../middlewares/authenticate");

router.get("/", async (req, res) => {
  try {
    const post = await Post.find()
      .populate({
        path: "user",
        select: { userId: 1, profile_image: 1 },
        populate: { path: "followers", select: { userId: 1 } },
      })
      .lean()
      .exec();
    return res.status(200).send(post.reverse());
  } catch (err) {
    return res.status(500).send("something went wrong");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({ path: "likes", select: { userId: 1, profile_image: 1 } })
      .populate({
        path: "comments",
        select: { title: 1 },
        populate: { path: "user", select: { userId: 1, profile_image: 1 } },
      })
      .populate({
        path: "user",
        select: { userId: 1, profile_image: 1 },
        populate: { path: "followers", select: { userId: 1 } },
      })
      .lean()
      .exec();
    const user = await User.findById(post.user)
      .select("-password")
      .lean()
      .exec();
    return res.status(200).send({ post, user });
  } catch (err) {
    return res.status(500).send("something went wrong");
  }
});
router.post("/", authentication, async (req, res) => {
  try {
    console.log(req.body, req.userId.userId);
    const post = await Post.create({ ...req.body, user: req.userId.userId });

    return res.status(201).send(post);
  } catch (err) {
    console.log(err);
    return res.status(500).send("something went wrong");
  }
});
router.post("/:id/like", authentication, async (req, res) => {
  try {
    let post;
    let checkLike = await Post.findOne({
      _id: req.params.id,
      likes: req.userId.userId,
    });
    if (checkLike) {
      post = await Post.updateOne(
        { _id: req.params.id },
        { $pull: { likes: req.userId.userId } }
      )
        .lean()
        .exec();
    } else {
      post = await Post.updateOne(
        { _id: req.params.id },
        {
          $push: { likes: req.userId.userId },
        }
      )
        .lean()
        .exec();
    }
    return res.status(201).send(post);
  } catch (err) {
    console.log(err);
    return res.status(500).send("something went wrong");
  }
});

router.post("/:id/comment", authentication, async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      user: req.userId.userId,
    });

    const post = await Post.updateOne(
      { _id: req.params.id },
      {
        $push: { comments: comment._id },
      }
    )
      .lean()
      .exec();
    return res.status(201).send(post);
  } catch (err) {
    console.log(err);
    return res.status(500).send("something went wrong");
  }
});

router.delete("/:id", authentication, async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send("something went wrong");
  }
});

module.exports = router;
