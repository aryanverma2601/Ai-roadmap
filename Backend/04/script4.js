const express = require("express");
const app = express();

//for server to read
app.use(express.json()); //json based data readable
app.use(express.urlencoded({ extended: true }));
