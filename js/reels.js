import { storage, db, auth } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";
import { addDoc, collection, onSnapshot } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.uploadReel = async () => {
  const file = reelFile.files[0];
  const refVid = ref(storage, "reels/" + file.name);
  await uploadBytes(refVid, file);
  const url = await getDownloadURL(refVid);

  await addDoc(collection(db,"reels"), {
    url,
    uid: auth.currentUser.uid
  });
};

onSnapshot(collection(db,"reels"), snap => {
  reels.innerHTML="";
  snap.forEach(d=>{
    reels.innerHTML += `
      <video src="${d.data().url}" controls style="width:100%"></video>
    `;
  });
});

