const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/user");

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    password = await bcrypt.hash(password, 8);
    const user = new User({
      email,
      password
  });
  try {
      const newuser = await user.save();
      const access_token = createAccessToken({ id: newuser._id });
    res.status(201).send({ user, access_token });
  } catch (error) {
    res.status(400).send(error);
  }
});


const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
};

