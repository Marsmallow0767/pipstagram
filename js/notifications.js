import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { db } from "./app.js";

const uid = localStorage.getItem("uid");

onSnapshot(
  collection(db,"messages"),
  snap=>{
    snap.docChanges().forEach(change=>{
      if(change.type==="added"){
        const m = change.doc.data();
        if(m.to === uid){
          alert("📩 Yeni mesaj geldi!");
        }
      }
    });
  }
);
