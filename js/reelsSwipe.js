import { db } from "./firebase.js";
import { getDocs, collection } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const wrap=document.getElementById("reels");

getDocs(collection(db,"reels")).then(snap=>{
  snap.forEach(r=>{
    const v=document.createElement("video");
    v.src=r.data().videoUrl;
    v.loop=true;
    v.muted=true;
    v.playsInline=true;
    wrap.appendChild(v);
  });
});
