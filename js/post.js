import { db, storage, auth } from "./firebase.js";
import { addDoc, collection } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

window.createPost = async () => {
  const file = postFile.files[0];
  const r = ref(storage, `posts/${Date.now()}`);
  await uploadBytes(r, file);
  const url = await getDownloadURL(r);

  await addDoc(collection(db, "posts"), {
    uid: auth.currentUser.uid,
    image: url,
    caption: caption.value,
    likes: 0
  });
};
