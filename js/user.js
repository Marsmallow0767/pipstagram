import { auth, db } from "./firebase.js";
import {
  doc, getDoc, collection, query, where, getDocs, addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const uid = new URLSearchParams(location.search).get("uid");

// PROFİL
const userSnap = await getDoc(doc(db, "users", uid));
usernameText.innerText = userSnap.data().username;

// POSTLAR
const q = query(collection(db, "posts"), where("uid", "==", uid));
const snap = await getDocs(q);

snap.forEach(d => {
  posts.innerHTML += `<img src="${d.data().image}" width="100%">`;
});

// TAKİP
followBtn.onclick = async () => {
  await addDoc(collection(db, "follows"), {
    from: auth.currentUser.uid,
    to: uid
  });
  alert("Takip edildi ✅");
};

// DM
dmBtn.onclick = () => {
  location.href = "dm.html?uid=" + uid;
};
