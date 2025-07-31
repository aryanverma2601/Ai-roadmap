const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); //dirname -> current directory ..// path.join-> dirname+public path
app.set("view engine", "ejs"); //backend ejs pages show karega

app.get("/", function (req, res) {
  //read from dir
  fs.readdir(`./files`, function (err, files) {
    // console.log(files);
    res.render("index", { files: files });
  });
});

app.get("/file/:filename", function (req, res) {
  fs.readFile(
    `./files/${req.params.filename}`,
    "utf-8",
    function (err, filedata) {
      //utf-8 buffer data to english
      res.render("show", { filename: req.params.filename, filedata: filedata });
    }
  );
});

//edit
app.get("/edit/:filename", function (req, res) {
  res.render("edit", { filename: req.params.filename });
});

app.post("/create", function (req, res) {
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    function (err) {
      res.redirect("/");
    }
  );
});

//edit
app.post("/edit", function (req, res) {
  console.log(req.body);
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}`,
    function (err) {
      res.redirect("/");
    }
  );
});

//Dynamic routing
// app.get("/profile/:username", function (req, res) {
//   res.send(`welcome ${req.params.username}`); //username value
// });

// app.get("/author/:username/:age", function (req, res) {
//   res.send(`Welcome ${req.params.username} , ${req.params.age}`);
// });

app.listen(3000, function () {
  console.log("It is running");
});
