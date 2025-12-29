import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
 getFirestore,collection,addDoc,getDocs,doc,updateDoc,onSnapshot
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
 getAuth,onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const app = initializeApp({
 apiKey:"API_KEY",
 authDomain:"pipstagram-5b98e.firebaseapp.com",
 projectId:"pipstagram-5b98e"
});

const db=getFirestore(app);
const auth=getAuth(app);
const feed=document.getElementById("feed");

let currentPost=null;
let userId="guest";

// AUTH
onAuthStateChanged(auth,u=>{ if(u) userId=u.uid });

// FEED
export async function loadFeed(){
 feed.innerHTML="";
 const snap=await getDocs(collection(db,"posts"));
 snap.forEach(d=>{
  const p=d.data();
  feed.innerHTML+=`
  <div class="post">
   <img src="${p.image}">
   <div class="actions">
    <button onclick="like('${d.id}')">❤️ ${p.likes||0}</button>
    <button onclick="openComments('${d.id}')">💬</button>
   </div>
   <p>${p.caption}</p>
  </div>`;
 });
}
loadFeed();

// LIKE
window.like=async(id)=>{
 const ref=doc(db,"posts",id);
 await updateDoc(ref,{likes:(Math.random()*100)|0});
 await addDoc(collection(db,"notifications"),{
  text:"Bir postun beğenildi ❤️",
  time:Date.now()
 });
 loadFeed();
};

// COMMENTS
window.openComments=(id)=>{
 currentPost=id;
 document.getElementById("popup").style.display="flex";
};
window.closePopup=()=>popup.style.display="none";
window.sendComment=async()=>{
 const txt=commentInput.value;
 if(!txt) return;
 await addDoc(collection(db,"comments"),{
  post:currentPost,text:txt
 });
 commentInput.value="";
};

// PROFILE
window.openProfile=()=>profileEdit.style.display="flex";
window.closeProfile=()=>profileEdit.style.display="none";
window.saveProfile=async()=>{
 await updateDoc(doc(db,"users",userId),{
  username:username.value
 });
 alert("Profil güncellendi");
 closeProfile();
};






