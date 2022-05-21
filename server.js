//create a server connection
const express = require("express");
const app = express();
const server = require("http").Server(app);
//uuid below generates a unique url that will be used for each room
const { v4: uuidv4 } = require("uuid");

//using ejs in express
app.set('view engine', 'ejs')

//socket.io lets us do live communication
const io = require("socket.io")(server);

//PeerJS allows the implementation of WebRTC
//WebRTC allows websites to stream media such as video/audio
const { ExpressPeerServer } = require("peer");

//peer server function
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

//calling the peer server function
app.use("/peerjs", peerServer);

//code below will allow access to stle.css and script.js in public folder 
//as in allow access to all static files in the public folder
app.use(express.static('public'));

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

//the code below takes in the roomId and userId and establishes a connection to both users 
io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);
  });
});

server.listen(3030);
