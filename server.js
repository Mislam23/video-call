//create a server connection
const express = require("express");
const app = express();
const server = require("http").Server(app);
//uuid generates a unique url that will be used for each room
const { v4: uuidv4 } = require("uuid");

//code below will allow access to stle.css and script.js in public folder 
//as in allow access to all static files in the public folder
app.use(express.static('public'));

//using ejs in express
app.set('view engine', 'ejs')

//below will create a unique url id for each room
app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

//get request -from this:
// app.get("/", (req, res) => {
//   res.status(200).send("Hi world!!");
// });

//to this:
// app.get("/", (req, res) => {
//   res.render('room');
// });

//then this:
app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});


server.listen(3030);
