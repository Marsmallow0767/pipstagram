import { auth, db, storage } from "./firebase.js";
import { collection, addDoc, onSnapshot } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

window.uploadReel = async () => {
  const file = reelFile.files[0];
  if (!file) return alert("Video seç");

  const vRef = ref(storage, "reels/" + Date.now() + file.name);
  await uploadBytes(vRef, file);
  const url = await getDownloadURL(vRef);

  await addDoc(collection(db,"reels"),{
    video: url,
    uid: auth.currentUser.uid,
    time: Date.now()
  });

  alert("Reels yüklendi 🎬");
};

onSnapshot(collection(db,"reels"), snap => {
  reels.innerHTML = "";
  snap.forEach(d => {
    reels.innerHTML += `
      <video src="${d.data().video}" controls style="width:100%"></video>
    `;
  });
});


