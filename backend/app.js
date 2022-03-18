const express = require("express");
const s3 = require("./src/controllers/S3");
const app = express();
const connect = require("./src/configs/db");
const cors = require("cors");

const { register, login } = require("./src/controllers/auth.controller");
const userController = require("./src/controllers/user.controller");
const postController = require("./src/controllers/post.controller");

app.use(express.json());
app.use(cors());

app.post("/register", register);
app.post("/login", login);
app.use("/user", userController);
app.use("/post", postController);
app.get("/s3", async (req, res) => {
  try {
    const url = await s3();
    return res.send({ url });
  } catch (err) {
    return res.status(400).send(err);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  await connect();
  console.log("listning on port " + port);
});
