import { db, auth } from "./firebase.js";
import { setDoc, doc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.activatePremium = () =>
  setDoc(doc(db,"subscriptions",auth.currentUser.uid),{plan:"premium"});
