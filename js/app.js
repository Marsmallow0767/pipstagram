import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "pipstagram-5b98e.firebaseapp.com",
  projectId: "pipstagram-5b98e",
  storageBucket: "pipstagram-5b98e.firebasestorage.app",
  messagingSenderId: "894857861700",
  appId: "1:894857861700:web:1d0c9028ed4125ecf43a11"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const feed = document.getElementById("feed");

// 🟢 FEED YÜKLE
async function loadFeed() {
  feed.innerHTML = "";
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const data = doc.data();
    feed.innerHTML += `
      <div class="post">
        <img src="${data.image}" />
        <p>${data.caption}</p>
      </div>
    `;
  });
}

loadFeed();

// 🟢 UPLOAD
window.openUpload = () => {
  document.getElementById("uploadModal").style.display = "flex";
};

window.closeUpload = () => {
  document.getElementById("uploadModal").style.display = "none";
};

window.uploadPost = async () => {
  const file = document.getElementById("fileInput").files[0];
  const caption = document.getElementById("captionInput").value;

  if (!file) return alert("Dosya seç!");

  const fileRef = ref(storage, `posts/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  const imageURL = await getDownloadURL(fileRef);

  await addDoc(collection(db, "posts"), {
    image: imageURL,
    caption: caption,
    createdAt: Date.now()
  });

  closeUpload();
  loadFeed();
};




