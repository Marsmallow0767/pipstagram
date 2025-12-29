import { db } from "./firebase.js";
import { collection, getDocs, updateDoc, doc, addDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const feed=document.getElementById("feed");
let activePost=null;

getDocs(collection(db,"posts")).then(snap=>{
  snap.forEach(p=>{
    const d=p.data();
    const box=document.createElement("div");
    box.className="post";
    box.innerHTML=`
      <b>${d.username}</b>
      <img src="${d.image}">
      <button onclick="like('${p.id}',${d.likes})">❤️ ${d.likes}</button>
      <button onclick="openComment('${p.id}')">💬</button>
      <p>${d.caption}</p>
    `;
    feed.appendChild(box);
  });
});

window.like=(id,l)=>updateDoc(doc(db,"posts",id),{likes:l+1});

window.openComment=id=>{
  activePost=id;
  commentPopup.style.display="flex";
};

window.closeComment=()=>commentPopup.style.display="none";

window.sendComment=()=>{
  addDoc(collection(db,"posts",activePost,"comments"),{
    text:commentInput.value,
    date:Date.now()
  });
  commentInput.value="";
};
