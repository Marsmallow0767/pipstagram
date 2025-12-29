import {
 collection,addDoc,query,orderBy,onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { db, auth } from "./firebase.js";

let chatId="";

export function openDM(otherUser){
 chatId=[auth.currentUser.uid,otherUser].sort().join("_");
 listenMessages();
}

function listenMessages(){
 const q=query(
  collection(db,"chats",chatId,"messages"),
  orderBy("time")
 );
 onSnapshot(q,snap=>{
  dmBox.innerHTML="";
  snap.forEach(d=>{
   const m=d.data();
   dmBox.innerHTML+=`<p>${m.from===auth.currentUser.uid?"🟢":"🔵"} ${m.text}</p>`;
  });
 });
}

export async function sendDM(text){
 await addDoc(collection(db,"chats",chatId,"messages"),{
  from:auth.currentUser.uid,
  text,
  time:Date.now()
 });
}
