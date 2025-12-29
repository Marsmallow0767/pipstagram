import { db, auth } from "./firebase.js";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const feed = document.getElementById("feed");
const storage = getStorage();

// POSTLARI YÜKLE
async function loadPosts() {
  feed.innerHTML = "";
  const snap = await getDocs(collection(db, "posts"));

  snap.forEach(d => {
    const p = d.data();
    feed.innerHTML += `
      <div class="post">
        <img src="${p.imageUrl}">
        <div>
          <button onclick="likePost('${d.id}', ${p.likes})">❤️</button>
          <span>${p.likes} beğeni</span>
        </div>
      </div>
    `;
  });
}

loadPosts();

// LIKE
window.likePost = async (id, likes) => {
  await updateDoc(doc(db, "posts", id), {
    likes: likes + 1
  });
  loadPosts();
};

// POST YÜKLE
document.getElementById("uploadBtn").onclick = async () => {
  const file = upload.files[0];
  if (!file) return alert("Foto seç");

  const r = ref(storage, `posts/${auth.currentUser.uid}/${Date.now()}`);
  await uploadBytes(r, file);
  const url = await getDownloadURL(r);

  await addDoc(collection(db, "posts"), {
    imageUrl: url,
    likes: 0,
    user: auth.currentUser.uid,
    createdAt: Date.now()
  });

  loadPosts();
};

// DARK MODE
themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
};
