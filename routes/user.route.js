const express = require("express");

const Router = express.Router();

const dbConnect = require("../db/dbConnect");

const users = require("../data/users");

Router.get("/", function (req, res) {
  res.send({
    message: "hello all users, welcome to the root page !",
    status: 1,
  });
});

Router.get("/home", function (req, res) {
  res.send({
    message: "hello all users, welcome to the home page !",
    status: 1,
  });
});

//user email-send

const emailSend = require("../helper/email-send");
Router.get("/user-email-send/:user", async function (req, res) {
  const user = req.params.user;
  const emailInfo = await emailSend(user);
  if (emailInfo) {
    res.send({ message: `message sent successfully to ${user}`, status: 1 });
  } else {
    res.send({
      message: `message not sent to ${user} email ,please tryt again after sometime!`,
      status: 0,
    });
  }
});

//get all users data request
Router.get("/api/get-users", function (req, res) {
  if (users.length > 0) {
    res.send({
      message: "Fetched all users successfully",
      status: 1,
      users: users,
    });
  } else
    res.send({
      message: "users not found",
      status: 1,
    });
});

//get specific user by id data request
Router.get("/api/user/:id", function (req, res) {
  const id = req.params.id;
  console.log("id", id);
  if (users.length > 0) {
    const specificUser = users.filter((user) => {
      return user.id == id;
    });
    console.log("specificUser", specificUser);
    res.send({
      message: "Fetched all users successfully",
      status: 1,
      user: specificUser,
    });
  } else
    res.send({
      message: "users not found",
      status: 1,
    });
});

Router.post("/register", async function (req, res) {
  console.log("req.body", req.body);
  const { name, email, password, role } = req.body;
  const user = await dbConnect();
  const userFind = await user.findOne({ email });
  console.log("userFind", userFind);
  if (userFind) {
    res.send({
      message:
        "user already exists with this email please login or signup with different email address",
      status: 0,
    });
  } else {
    const insertData = user.insertOne({
      name,
      email,
      password,
      role,
    });
    if (insertData) {
      res.send({
        message: "user registration successfully",
        status: 1,
        name: name,
        email: email,
        password: password,
        role: role,
      });
    } else {
      res.send({
        message: "user registration failed",
        status: 0,
      });
    }
  }
});
Router.post("/login", function (req, res) {
  console.log("req.body", req.body);
  const { email, password } = req.body;
  if (email && password) {
    res.send({
      message: "user login successfully",
      status: 1,
      email: email,
      password: password,
    });
  } else {
    res.send({ message: "user login failed", status: 0 });
  }
});

module.exports = Router;
