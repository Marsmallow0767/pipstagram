import { db, auth } from "./firebase.js";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  setDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.openProfile = async () => {
  feed.style.display = "none";
  reels.style.display = "none";
  profile.style.display = "block";

  const uid = auth.currentUser.uid;

  const u = await getDoc(doc(db, "users", uid));
  profileName.textContent = u.data().username;

  const posts = await getDocs(
    query(collection(db, "posts"), where("user", "==", uid))
  );
  postCount.textContent = posts.size;

  const followers = await getDocs(
    query(collection(db, "follows"), where("to", "==", uid))
  );
  followerCount.textContent = followers.size;

  followBtn.style.display = "none";
};
