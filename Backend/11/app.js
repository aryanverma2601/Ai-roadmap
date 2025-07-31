const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");

app.get("/", function (req, res) {
  res.send("hey");
});

app.get("/create", async function (req, res) {
  let user = await userModel.create({
    username: "Aryan",
    age: 22,
    email: "aryan@gmail.com",
  });

  res.send(user);
});

app.get("/post/create", async function (req, res) {
  let post = await postModel.create({
    postdata: "hello",
    user: "6852a9180817b5610b50c5f3",
  });

  let user = await userModel.findOne({ _id: "6852a9180817b5610b50c5f3" });

  user.posts.push(post._id);
  await user.save(); //we have done changes ourselves so we have to write save()

  res.send({ post, user });
});

app.listen(3000);
