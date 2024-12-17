const express = require("express");
const User = require("../models/user");
const { validationSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // Validate the data
    validationSignUpData(req);

    // Encrypt the password
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Creating a new instance of user model
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });

    await user.save();
    res.send("user signup successfull");
  } catch (err) {
    res.status(400).send("signup failed" + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    // we will get email and password from req.body
    const { email, password } = req.body;

    // adding validation if entered email is valid or not
    if (!validator.isEmail(email)) {
      throw new Error("email not valid");
    }

    // We will find if user is present in our database
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User not registerd");
    }

    // Here we will compare the password which we got
    // from req.body to which we got from user i.e user.password
    const isPasswordCorrect = bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      res.send("Login succesfull");
    } else {
      throw new Error("Login failed");
    }
  } catch (err) {
    res.status(400).send("signup failed" + err.message);
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

authRouter.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "age", "about", "skills", "gender"];
    const isUpdatesAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdatesAllowed) {
      throw new error("update not allowed");
    }
    await User.findByIdAndUpdate(userId, data, { runValidators: true });
    res.send("user updated successfully");
  } catch (err) {
    res.status(400).send("something went wrong" + err.message);
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

// authRouter.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   try {
//     const ALLOWED_UPDATED = ["gender", "about", "skills"];
//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATED.includes(k)
//     );
//     if (!isUpdateAllowed) {
//       throw new error("update not allowed");
//     }
//     const user = await User.findByIdAndUpdate({ _id: userId }, data);
//     res.send("user updated succesfully");
//   } catch (error) {
//     res.status(400).send("updated failed" + error);
//   }
// });

module.exports = authRouter;
