import { collection, addDoc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./app.js";

const uid = localStorage.getItem("uid");
const chat = document.getElementById("messages");

window.send = async ()=>{
  await addDoc(collection(db,"messages"),{
    from: uid,
    to: to.value,
    text: msg.value,
    time: Date.now()
  });
};

const q = query(collection(db,"messages"), where("to","==",uid));
onSnapshot(q,snap=>{
  chat.innerHTML="";
  snap.forEach(d=>{
    chat.innerHTML += `<p>${d.data().text}</p>`;
  });
});
