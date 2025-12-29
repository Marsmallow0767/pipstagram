import { auth, db, storage } from "./firebase.js";
import { collection, addDoc, onSnapshot } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

window.uploadPost = async () => {
  const file = postFile.files[0];
  const caption = captionInput.value;

  if (!file) return alert("Foto seç");

  const imgRef = ref(storage, "posts/" + Date.now() + file.name);
  await uploadBytes(imgRef, file);
  const url = await getDownloadURL(imgRef);

  await addDoc(collection(db,"posts"),{
    image: url,
    caption,
    uid: auth.currentUser.uid,
    time: Date.now()
  });

  alert("Post paylaşıldı 📸");
};

onSnapshot(collection(db,"posts"), snap => {
  posts.innerHTML = "";
  snap.forEach(d => {
    posts.innerHTML += `
      <div>
        <img src="${d.data().image}" width="100%">
        <p>${d.data().caption}</p>
      </div>
    `;
  });
});

