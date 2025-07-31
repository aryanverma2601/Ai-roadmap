const mongoose = require("mongoose");

mongoose.connect(`mongodb://127.0.0.1:27017/mongoPractice`);

const userSchema = mongoose.Schema({
  //har user ke pass kya kya properties hogi
  name: String,
  username: String,
  email: String,
});

//we have to create model for CRUD operation

module.exports = mongoose.model("user", userSchema); //to use in routes in app.js
