import { auth, db, storage } from "./firebase.js";
import { doc, getDoc, setDoc } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

window.saveProfile = async () => {
  const username = document.getElementById("username").value;
  const file = document.getElementById("avatar").files[0];

  let avatarURL = "";

  if (file) {
    const r = ref(storage, "avatars/" + auth.currentUser.uid);
    await uploadBytes(r, file);
    avatarURL = await getDownloadURL(r);
  }

  await setDoc(doc(db, "users", auth.currentUser.uid), {
    username,
    avatar: avatarURL
  }, { merge: true });

  alert("Profil güncellendi ✅");
};

async function loadProfile() {
  const snap = await getDoc(doc(db, "users", auth.currentUser.uid));
  if (snap.exists()) {
    username.value = snap.data().username || "";
    avatarImg.src = snap.data().avatar || "";
  }
}

window.onload = loadProfile;


