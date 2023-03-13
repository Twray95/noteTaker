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
    });
});

module.exports = notes;

// console.log(array[0].id);
// array.forEach((element) => {
//     console.log(element.id);
//     if (element.id === req.params.id) {
//       console.log("in delete");
//       delete element;
//     }
//     console.log(array);
