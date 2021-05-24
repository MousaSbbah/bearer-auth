"use strict";

const bcrypt = require("bcrypt");
const User = require("./models/users.js");
const basicAuth = require("./middleware/basic");
const bearerAuth = require("./middleware/bearer.js");
const express = require("express");
const Router = express.Router();


//signup rout function 
Router.post("/signup", async (req, res, next) => {
    try {
      const user = new User(req.body);
      const savedUser = await user.save();
  
      res.status(201).json({
        
        user: savedUser,
        token: savedUser.token
      });
    } catch (error) {
      next(error);
    }
});
//signin rout  basic middleware function
Router.post('/signin', basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  res.status(200).json(user);
});

Router.get('/users',bearerAuth,(req,res)=>{
  res.json({ user: req.user });
})

module.exports = Router;
