import { db } from "./firebase.js";
import { getDoc, doc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.isVerified = uid => getDoc(doc(db,"verified",uid));
