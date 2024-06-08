const express = require("express");
const bcrypt = require("bcyrpt");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");

const router = express.Router();

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userName, password } = req.body;

    try {
      let user = await User.findOne({ userName });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User([userName, password]);

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
    } catch (err) {
      console.log(err.message);
      res.status(400).send("Server Error");
    }
  }
);

router.post(
  "/login",
  [
    check("userName", "Username is required").not.isEmpty(),
    check("password", "Password is required").not.isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userName = req.body.userName;
    const password = req.body.password;

    try {
      let user = await User([userName]);

      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      const salt = await bcrypt.genSalt(10);

      const isMatch = bcrypt.compare(password, user.password);
      if (isMatch) {
        return user;
      } else {
        res.status(400).json({ msg: "Invalid Credentials" });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).send("Server Error");
    }
  }
);

module.exports = router;
