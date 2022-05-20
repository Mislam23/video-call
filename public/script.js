//this file holds all the client side code
let myVideoStream;
const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");

myVideo.muted = true;
navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
})
.then((stream) => {
  myVideoStream = stream;
  //here we place the add Video Stream function
  addVideoStream(myVideo, stream);
});

//add Video Stream function will add our video to the video element
const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
    videoGrid.append(video);
  });
};