var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var dbRouter = require("./routes/router");
const connection = require("./routes/connection");
const loginHandler = require("./routes/handler/usersHandler/loginHandler");
const checkSessionHandler = require("./routes/handler/usersHandler/checkSessionHandler");
const registerHandler = require("./routes/handler/usersHandler/registerHandler");

connection.connect();

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use(dbRouter);
app.use("/", loginHandler);
app.use("/session", checkSessionHandler);
app.use("/", registerHandler);

module.exports = app;
