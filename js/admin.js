import { db } from "./firebase.js";
import { deleteDoc, doc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.deletePost = id => deleteDoc(doc(db,"posts",id));
