// modules
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const log4js = require("log4js");
const mongodb = require("./core/mongodb");

// import 等语法要用到 babel 支持
require("babel-register");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// logger
log4js.configure("log4js.json");
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: "auto" }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// cookie
app.use(cookieParser("blog_node_cookie"));
app.use(
  session({
    secret: "blog_node_cookie",
    name: "session_id", //# 在浏览器中生成cookie的名称key，默认是connect.sid
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 1000 * 30, httpOnly: true } //过期时间
  })
);

// data server
mongodb.connect();

//将路由文件引入
const route = require('./routes/index');

//初始化所有路由
route(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
