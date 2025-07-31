const express = require("express");

const app = express(); //express is a function and now app can do everything express can do

//Middleware

app.use(function (req, res, next) {
  console.log("Middleware");
  next(); //request forward
}); //jitni bhi request aayegi usse phele yeh chalega

//routes create karna
app.get(
  "/", // route
  (req, res) => {
    res.send("Hello ! World");
  }
);
app.get("/profile", (req, res, next) => {
  return next(new Error("something went wrong"));
});

//error handling
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(3000); //server ko start karna hoga
