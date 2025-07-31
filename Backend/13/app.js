const express = require("express");
const app = express();
const multer = require("multer");
const crypto = require("crypto");
const path = require("path");
const multerconfig = require("./config/multerconfig");

// app.set("view engine", "ejs");
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images/uploads");
//   },
//   filename: function (req, file, cb) {
//     crypto.randomBytes(12, function (err, bytes) {
//       const fn = bytes.toString("hex") + path.extname(file.originalname); //convert to hex and then extract jpeg from extname
//       cb(null, fn); //filename set
//     });
//   },
// });

// const upload = multer({ storage: storage });

// app.get("/test", (req, res) => {
//   res.render("test");
// });

// app.post("/upload", upload.single("image"), (req, res) => {
//   console.log(req.file);
//   res.redirect("/test");
// });

app.listen(3000);
