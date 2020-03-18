var express = require("express")
var app = express()
var db = require("./db/db.json")

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var PORT = 4000
const fs = require("fs")
const path = require("path")
const OUTPUT_DIR = path.resolve(__dirname, "db.json")
const outputPath = path.join(OUTPUT_DIR, "db.json")
OUTPUT_DIR



//GET /notes - Should return the notes.html file.
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"))
})


// GET /api/notes - Should read the db.json file and return
// all saved notes as JSON.
app.post("/api/notes", function (req, res) {
  var newNote = req.body;
  fs.WriteFile("db/db.json", JSON.stringify(newNote), function(err){
    console.log(err)
  });
})

app.post("/api/clear", function (req, res) {
  notes.length = 0
  res.json({ ok: true })
})

//activates the listener PORT
app.listen(PORT, function () {
  console.log("App listening to " + PORT);
});