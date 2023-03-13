const notes = require("express").Router();
const fs = require("fs");
const {
  readFromFile,
  writeToFile,
  readAndAppend,
} = require("../helper/helper");
const { v4: uuidv4 } = require("uuid");

//I used the code from 28-Stu_Mini-Project as the basis for these request

//app.get request to create side card of notes
notes.get("/", (req, res) => {
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

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

//delete request that takes in the id param of the element and removes it from the db.json
notes.delete("/:id", (req, res) => {
  console.log(req.params.id);

  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((array) => {
      for (i = 0; i < array.length; i++) {
        if (array[i].id === req.params.id) {
          array.splice(i, 1);
          console.log("splice");
        } else {
          console.log("no delete this time");
        }
      }
      writeToFile("./db/db.json", array);
    })
    .then((data) => res.json(data));
});

module.exports = notes;
