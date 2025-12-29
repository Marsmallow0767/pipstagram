import {
 getStorage,ref,uploadBytes,getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { collection,addDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { auth, db } from "./firebase.js";

const storage=getStorage();

export async function uploadReel(file){
 const r=ref(storage,"reels/"+Date.now()+file.name);
 await uploadBytes(r,file);
 const url=await getDownloadURL(r);

 await addDoc(collection(db,"reels"),{
  video:url,
  user:auth.currentUser.uid,
  time:Date.now(),
  likes:0
 });
}
