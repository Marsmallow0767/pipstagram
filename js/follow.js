import { doc,updateDoc,arrayUnion } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { auth, db } from "./firebase.js";

export async function follow(userId){
 await updateDoc(doc(db,"users",userId),{
  followers:arrayUnion(auth.currentUser.uid)
 });
 await updateDoc(doc(db,"users",auth.currentUser.uid),{
  following:arrayUnion(userId)
 });
}
