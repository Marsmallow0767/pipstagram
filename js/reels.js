import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./app.js";

const wrap = document.body;

onSnapshot(collection(db,"reels"), snap=>{
  wrap.innerHTML="";
  snap.forEach(d=>{
    wrap.innerHTML += `
      <video src="${d.data().video}"
        autoplay loop muted
        style="width:100vw;height:100vh;object-fit:cover">
      </video>
    `;
  });
});
