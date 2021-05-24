"use strict";

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  let status = Number(err.status) || 500;
  res.status(status).json({
    status: status || 500,
    message: err.message || "Something Went Wrong",
    route: req.path,
  });
};
