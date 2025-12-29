import { auth, db } from "./firebase.js";
import {
  collection, addDoc, query, where, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const to = new URLSearchParams(location.search).get("uid");

window.sendMsg = async () => {
  await addDoc(collection(db, "messages"), {
    from: auth.currentUser.uid,
    to,
    text: msg.value,
    time: Date.now()
  });
  msg.value = "";
};

const q = query(
  collection(db, "messages"),
  where("from", "in", [auth.currentUser.uid, to])
);

onSnapshot(q, snap => {
  messages.innerHTML = "";
  snap.forEach(d => {
    messages.innerHTML += `<p>${d.data().text}</p>`;
  });
});

