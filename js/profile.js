import { auth, db, storage } from "./firebase.js";
import { doc, setDoc, getDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

window.saveProfile = async () => {
  const username = document.getElementById("username").value;
  const file = document.getElementById("avatar").files[0];

  let avatarUrl = "";

  if (file) {
    const avatarRef = ref(storage, "avatars/" + auth.currentUser.uid);
    await uploadBytes(avatarRef, file);
    avatarUrl = await getDownloadURL(avatarRef);
  }

  await setDoc(doc(db, "users", auth.currentUser.uid), {
    username,
    avatar: avatarUrl
  });

  alert("Profil güncellendi ✅");
};

// PROFİLİ ÇEK
window.loadProfile = async () => {
  const snap = await getDoc(doc(db,"users",auth.currentUser.uid));
  if (snap.exists()) {
    document.getElementById("username").value = snap.data().username;
    if (snap.data().avatar)
      document.getElementById("avatarImg").src = snap.data().avatar;
  }
};

