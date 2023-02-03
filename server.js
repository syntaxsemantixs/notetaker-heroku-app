const express = require("express");
const fs = require("fs");
const path = require('path');
const { clog } = require('./middleware/clog')
const api = require('./routes/index.js')

//import dependencies

const app = express();
const PORT = process.env.PORT || 3001

app.use(clog);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);
//allows us to use the public folder in our files and middleware

//route setup

//GET


app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/pages/notes.html')));


// app.get("/notes", function (req, res) {
//     res.sendFile(path.join(__dirname, "public/notes.html"));
// });

// app.get("/api/notes/", function (req, res) {
//     fs.readFile(__dirname + "/db/db.json", (err, data) => {
//         var json = JSON.parse(data);
//         return res.json(json);
//     })
// });

app.get("*", function (req, res) {
    res.sendFile((path.join(__dirname + "/public/index.html")));
});

//POST

// app.post("/api/notes", function (req, res) {
//     addNote = req.body;

//     fs.readFile(__dirname + "/db/db.json", (err, data) => {
//         const jsonFile = JSON.parse(data);
//         json.push(addNote);

//         fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(jsonFile))
//     })
// })

//DELETE

// app.delete("/api/notes/:id", function (req, res) {
//     let response = req.params;
//     let id = response.id;
//     console.log(`Note id: ${id} marked to be deleted`)

//     fs.readFile(__dirname + "/db/db.json", (err, data) => {
//         const jsonFile = JSON.parse(data);

//         const filteredJson = json.filter((element) => element.id !== id);

//         fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(filteredJson));

//     });
// });

app.listen(PORT, () => {
    console.log(`Express server listening on http://localhost:${PORT}`)

    //finish console log message tomorrow. Check loccally then try heroku
})