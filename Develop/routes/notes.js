const notes = require("express").Router();
const fs = require("fs");
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helper/helper");
const { v4: uuidv4 } = require("uuid");

//app.get request to create side card of notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

//app.get request to bring up old notes

//app.post request to create new notes
notes.post("/", (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`You have added your new note successfully!`);
  } else {
    res.error("Something went wrong while adding note");
  }
});

module.exports = notes;
