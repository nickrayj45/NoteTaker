// Universal variables
var express = require("express");
var app = express();
var db = require("./db/db.json");

// Express functions to use
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Constants, Lets and Variables
var PORT = 4000;
const fs = require("fs");
const path = require("path");
let noteId = db.map(note => note.id);

//GET methods to send user to the pages
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function(req, res) {
  // var getNote = req.body;
  // fs.WriteFile("db/db.json", JSON.stringify(getNote), function(err){
  //   console.log(err)
  res.json(db);
});
// })

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Functions to add, save and delete notes

app.post("/api/notes", function(req, res) {
  let newId = 0;
  while (noteId.includes(newId)) {
    newId++;
  }
  noteId.push(newId);
  const nextNote = {
    id: newId,
    title: req.body.title,
    text: req.body.text
  };
  db.push(nextNote);

  fs.WriteFile(
    "./db/db.json",
    JSON.stringify(db),
    "utf8",
    (err, data) => {
      if (err) throw err;
    }
    // function(err)
    //   console.log(err)
  );
});

// Delete function
app.delete("/api/notes/:id", (req, res) => {
  let newDb = [];
  for (let index = 0; index < db.length; index++) {
    if (db[index].id != req.params.id) {
      newDb.push(db[index]);
    }
  }
  db = newDb;

  fs.writeFile("./db/db.json", JSON.stringify(db), "utf8", (err, data) => {
    if (err) throw err;
  });
});

app.post("/api/clear", function(req, res) {
  notes.length = 0;
  res.json({ ok: true });
});

//activates the listener PORT
app.listen(PORT, function() {
  console.log("App listening to " + PORT);
});
