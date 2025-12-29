import { db } from "./firebase.js";
import { collection, getDocs } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const storiesDiv = document.getElementById("stories");
const viewer = document.getElementById("storyViewer");
const text = document.getElementById("storyText");

getDocs(collection(db,"stories")).then(snap=>{
  snap.forEach(d=>{
    const s=document.createElement("div");
    s.className="story";
    s.innerText=d.data().username;
    s.onclick=()=>{
      viewer.style.display="flex";
      text.innerText=d.data().text || "Hikâye";
      setTimeout(closeStory,5000);
    };
    storiesDiv.appendChild(s);
  });
});

window.closeStory=()=>viewer.style.display="none";
