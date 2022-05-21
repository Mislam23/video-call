//this file holds all the client side code
const socket = io("/");
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");

//this keeps the video muted initially
myVideo.muted = true;

var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "3030",
});

let myVideoStream;
navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
})
.then((stream) => {
  myVideoStream = stream;
  //here we place the add Video Stream function
  addVideoStream(myVideo, stream);

  //we're adding another video element when the user joins our call room
  peer.on("call", (call) => {
    call.answer(stream);
    const video = document.createElement("video");
    call.on("stream", (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
  });

  //when the user is connected call the connect to new user function
  socket.on("user-connected", (userId) => {
    connectToNewUser(userId, stream);
  });
});

//at this point the functions keep calling other functions within them to establish a call function that is seen on the UI
const connectToNewUser = (userId, stream) => {
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
};

peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id);
});

//add Video Stream function will add our video to the video element
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoGrid.append(video);
  });
};