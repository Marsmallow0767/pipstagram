import { db, auth } from "./firebase.js";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// URL'den UID al
const params = new URLSearchParams(window.location.search);
const uid = params.get("uid");

// PROFİL BİLGİSİ
const userSnap = await getDoc(doc(db,"users",uid));
if (userSnap.exists()) {
  usernameText.innerText = userSnap.data().username;
  avatarImg.src = userSnap.data().avatar || "";
}

// PAYLAŞIMLAR
const q = query(
  collection(db,"posts"),
  where("uid","==",uid)
);

const postsSnap = await getDocs(q);
postsSnap.forEach(p => {
  userPosts.innerHTML += `
    <img src="${p.data().image}" width="100%">
  `;
});

// TAKİP
followBtn.onclick = async () => {
  await setDoc(doc(db,"follows",auth.currentUser.uid+"_"+uid),{
    from: auth.currentUser.uid,
    to: uid
  });
  alert("Takip edildi ✅");
};
