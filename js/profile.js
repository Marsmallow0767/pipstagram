import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const auth = getAuth();
const storage = getStorage();
const db = getFirestore();

window.uploadProfile = async () => {
  const file = document.getElementById("photo").files[0];
  const uid = auth.currentUser.uid;

  const imgRef = ref(storage, `profiles/${uid}`);
  await uploadBytes(imgRef, file);
  const url = await getDownloadURL(imgRef);

  await setDoc(doc(db, "users", uid), {
    photoURL: url
  }, { merge: true });

  alert("Profil foto güncellendi!");
};
;
