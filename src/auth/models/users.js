"use strict";
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.virtual("token").get(function () {
  return jwt.sign(
    { username: this.username, test: "test" },
    process.env.SECRET,
    {expiresIn: '15m'}
  );
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.statics.authenticateBearer = async function (token) {
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    const user = await this.findOne({
      username: payload.username,
    });
    

    if (user) {
      return user;
    } else {
      throw new Error({message:"invalid username from token"});
    }
  } catch (error) {
    throw new Error(error);
  }
};

userSchema.statics.authenticateBasic = async function (username, password) {
  try {
    const user = await this.findOne({ username });
    console.log(user);
    const isValid = await bcrypt.compare(password, user.password);
    console.log(isValid);
    if (isValid) {
      return user;
    } else {
      throw new Error({message:"Invalid user!!!"});
    }
  } catch (error) {
    throw new Error(error);
  }
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
