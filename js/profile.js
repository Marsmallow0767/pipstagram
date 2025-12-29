import { db, auth } from "./firebase.js";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.sendMsg = async () => {
  await addDoc(collection(db,"messages"), {
    text: msg.value,
    uid: auth.currentUser.uid,
    time: Date.now()
  });
  msg.value="";
};

const q = query(collection(db,"messages"), orderBy("time"));
onSnapshot(q, snap => {
  messages.innerHTML="";
  snap.forEach(d=>{
    messages.innerHTML += `<p>${d.data().text}</p>`;
  });
});

