const express = require("express");
const fs = require("fs");
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helper/helper");
const app = express();

module.exports = app;
