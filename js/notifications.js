import { collection, onSnapshot, query, where } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db } from "./app.js";

const uid = localStorage.getItem("uid");
const badge = document.getElementById("notifBadge");

const q = query(
  collection(db,"notifications"),
  where("to","==",uid),
  where("seen","==",false)
);

onSnapshot(q, snap=>{
  badge.textContent = snap.size;
  badge.style.display = snap.size ? "inline-block" : "none";
});

