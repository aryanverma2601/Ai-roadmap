const express = require("express");
const app = express();
const userModel = require("./usermodel");

app.get("/", function (req, res) {
  res.send("hey");
});

// app.get("/create", async (req, res) => {
//   let createdUser = await userModel.create({
//     //async operation
//     name: "Aryan",
//     email: "aryan@gmail.com",
//     username: "AV",

//     //id -> 24 characters First 3 byte ->timestamp ,next->machine information
//   });
//   res.send(createdUser);
// });

app.get("/create", async (req, res) => {
  let createdUser = await userModel.create({
    //async operation
    name: "verma",
    email: "verma@gmail.com",
    username: "AV1",

    //id -> 24 characters First 3 byte ->timestamp ,next->machine information
  });
  res.send(createdUser);
});

//update
app.get("/update", async (req, res) => {
  // userModel.findOneUpdate(findone, update, { new: true });
  let updatedUser = await userModel.findOneAndUpdate(
    { username: "AV1" },
    { name: "aryan" },
    { new: true }
  );
  res.send(updatedUser);
});

//read
app.get("/read", async (req, res) => {
  let users = await userModel.find(); //to read all
  // let users = await userModel.find({ username: "AV1" }); //returns array , when empty return []
  // let users = await userModel.findOne({ username: "AV1" }); //return object when empty gives black screen, it gives first one of same two username

  res.send(users);
});

//delete
app.get("/delete", async (req, res) => {
  let users = await userModel.findOneAndDelete({ username: "AV1" });
  res.send(users);
});

app.listen(3000);
