"use strict";
const base64 = require("base-64");
const bcrypt = require("bcrypt");
const User = require("../models/users.js");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next({ message: "authorization header is not provided" });
    return;
  }
  try {
    const basicAuth = req.headers.authorization.split(" ").pop();

    const [username, password] = base64.decode(basicAuth).split(":");

    req.user = await User.authenticateBasic(username, password);

    next();
  } catch (error) {
    res.status(403).send('Invalid Username')
  }
};
