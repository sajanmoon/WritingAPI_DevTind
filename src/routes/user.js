const express = require("express");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  // req.body for a dynamic input
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user signup successfull");
  } catch (err) {
    res.status(400).send("signup failed", err);
  }
});

// authRouter.get("/user", async (req, res) => {
//   // get the user by email from database

//   const userEmail = req.body.email;

//   try {
//     const user = await User.find({ email: userEmail });
//     res.send(user);
//   } catch (err) {
//     res.status(400).send("something went wrong", err);
//   }
// });

// FIND the user ********************************
authRouter.get("/user", async (req, res) => {
  // get the user by name from database
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong", err);
  }
});

// FEED API *********************************

authRouter.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("something went wrong", err);
  }
});

// DELETE API **************************
authRouter.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("user deleted succesfully");
  } catch (err) {
    res.status(400).send("something went wrong", err);
  }
});

// UPDATE API with id ***************************
authRouter.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await User.findByIdAndUpdate(userId, data);
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("something went wrong", err);
  }
});

// UPDATE API with email ***************************
authRouter.put("/user", async (req, res) => {
  const userEmail = req.body.email;
  const data = req.body;
  try {
    await User.findOneAndUpdate({ email: userEmail }, data);
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("something went wrong", err);
  }
});
module.exports = authRouter;
