"use strict";
const User = require("../models/users.js");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    next("authorization header is not provided");
    return;
  }
  try {

    // Read the Token from the header 
    const token = req.headers.authorization.split(" ").pop();
    // get the user by using token
    const user = await User.authenticateBearer(token);
    
    req.user = user;
    next();
  } catch (error) {
    // res error ({message:"Invalid token" , status:403});
    res.status(403).send('Invalid Token');
  }
};

