const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");

app.use(cookieParser());

//cookie Set and Read
// app.get("/", function (req, res) {
//   res.cookie("name", "aryan");
//   res.send("done");
// });

// //when to route to some another page the cookie will attach itself to the request automatically
// app.get("/read", function (req, res) {
//   console.log(req.cookies); //to read cookie
//   res.send("read page");
// });

//encryption and decryption

// app.get("/", function (req, res) {
//   //salt random string
//   //encrypt
//   bcrypt.genSalt(10, function (err, salt) {
//     bcrypt.hash("aryanverma", salt, function (err, hash) {
//       console.log(hash);
//     });
//   });

//   res.send("done");
// });

// app.get("/", function (req, res) {
//   //decrypt
//   bcrypt.compare(
//     "aryanverma", //password
//     "$2b$10$jx85BCTfUtxgh1DU9nX/d.1DoMCMM210dskTBigGVL.ubU8kHqIly", //hash
//     function (err, result) {
//       console.log(result);
//     }
//   );
//   res.send("working");
// });

app.get("/", function (req, res) {
  let token = jwt.sign({ email: "aryan@gmail.com" }, "secret"); //based on secret this data will be encrypted
  res.cookie("token", token);
  res.send("done");
});
app.get("/read", function (req, res) {
  //   console.log(req.cookies.token); //browser has sent cookie
  //retrieving data
  let data = jwt.verify(req.cookies.token, "secret");
  console.log(data);
});
app.listen(3000);
