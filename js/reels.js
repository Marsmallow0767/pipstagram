const reels = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://www.w3schools.com/html/movie.mp4"
];

let index = 0;
const video = document.createElement("video");
video.src = reels[index];
video.autoplay = true;
video.loop = true;
video.muted = true;
video.style.width = "100vw";
video.style.height = "100vh";
video.style.objectFit = "cover";

document.body.innerHTML = "";
document.body.appendChild(video);

let startY = 0;

document.addEventListener("touchstart", e=>{
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", e=>{
  const endY = e.changedTouches[0].clientY;
  if(startY - endY > 50) next();
  if(endY - startY > 50) prev();
});

function next(){
  index = (index+1)%reels.length;
  video.src = reels[index];
}
function prev(){
  index = (index-1+reels.length)%reels.length;
  video.src = reels[index];
}
