import { db, auth } from "./firebase.js";
import {
  addDoc, collection, onSnapshot, query, where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export const sendNotification = async (to, type) => {
  await addDoc(collection(db,"notifications"),{
    to,
    from: auth.currentUser.uid,
    type,
    time: Date.now()
  });
};

const q = query(
  collection(db,"notifications"),
  where("to","==",auth.currentUser.uid)
);

onSnapshot(q, snap => {
  notif.innerHTML="";
  snap.forEach(n=>{
    notif.innerHTML += `<p>🔔 ${n.data().type}</p>`;
  });
});




