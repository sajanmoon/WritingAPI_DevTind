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

module.exports = authRouter;
