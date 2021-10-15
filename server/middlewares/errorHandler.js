"use strict";

const errorHandler = (error, req, res, next) => {
  res.status(error.code || 500).json({
    message: error.message || "Internal Error",
  });
};

module.exports = errorHandler;
