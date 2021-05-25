"use strict";
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.virtual("token").get(function () {
  //generate and return the token for the user 
  return jwt.sign(
    { username: this.username },
    process.env.SECRET,
    { expiresIn: "15m" }
  );
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.statics.authenticateBearer = async function (token) {
  try {
    //Take the user name from the token
    const payload = jwt.verify(token, process.env.SECRET);
    const user = await this.findOne({
      username: payload.username,
    });

    //return the user if exist
    if (user) {
      return user;
    } else {
      throw new Error({ message: "invalid username from token" });
    }
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.statics.authenticateBasic = async function (username, password) {
  try {
    //finde user name from database
    const user = await this.findOne({ username });
    //Compare the password from the database
    const isValid = await bcrypt.compare(password, user.password);
    // if valid user name and password return the user
    if (isValid) {
      return user;
    } else {
      //if not throw errors
      throw new Error({ message: "Invalid user!!!" });
    }
  } catch (error) {
    throw new Error(error);
  }
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
