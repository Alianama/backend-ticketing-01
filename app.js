var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var dbRouter = require("./routes/router");
const connection = require("./routes/connection");
const loginHandler = require("./routes/handler/usersHandler/loginHandler");

connection.connect();

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/ticket", dbRouter);
app.use("/login", loginHandler);

module.exports = app;
