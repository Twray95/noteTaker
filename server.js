const express = require("express");
const api = require("./routes/index.js");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use(express.static(__dirname + "/public"));

//Get route for the home page http://localhost:3001
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

//Get route for the notes page http://localhost:3001/notes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

app.listen(PORT, () => console.log("server online"));
