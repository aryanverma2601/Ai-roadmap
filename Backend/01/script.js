//Node.js -> not a {programming langurage, technology,framework,library}
// It is a js runtime environment
// js does not have the funcitonality jisse backend banta hai

//js ka code likhege jo ki wrapper layer of js recieve and wo code v8 enginge ke c++ modules ke saath ek server create krega

//nodejs is a js runtime environment
//npm -> package store

//working with node and npm
//npm init
//node basic usage

//File system

const { error } = require("console");
const fs = require("fs");
// write;
fs.writeFile("hey.txt", "hey hello world", function (err) {
  if (err) {
    console.log("error");
  } else console.log("done");
});

//append
// fs.appendFile("hey.txt", "Hello aryan fjij", function (err) {
//   if (err) {
//     console.log("error");
//   } else console.log("done");
// });

// rename;
fs.rename("hello.txt", "hello.txt", function (err) {
  if (err) {
    console.log("error");
  } else console.log("done");
});

//copy file

fs.copyFile("hello.txt", "./copy/hi.txt", function (err) {
  if (err) {
    console.error(err.message);
  } else console.log("done");
});

// unlink /delete
// fs.unlink("hello.txt", function (err) {
//   if (err) {
//     console.error(err);
//   } else console.log("removed");
// });

//removed directory -> by default it gives you permission to delete empty folders

// fs.rm("./copy", { recursive: true }, function (err) {
//   if (err) console.error(err);
//   else console.log("removed");
// });

//read

//++++++++++++++++++++++++++ HTTP +++++++++++++++++++++++++++++++++++
//http - protocol -> rule hai jisko follow kare bina aap internet pe naa hi kucch bhej sakte ho, naa hi kuch manga sakte ho

// const http = require("http");

// const server = http.createServer(function (req, res) {
//   res.end("hello world");
// });

// server.listen(3001);
