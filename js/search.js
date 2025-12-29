import { db } from "./firebase.js";
import { collection, query, where, getDocs } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.searchUser = async () => {
  const text = searchInput.value.toLowerCase();
  results.innerHTML = "";

  const q = query(
    collection(db, "users"),
    where("username", ">=", text),
    where("username", "<=", text + "\uf8ff")
  );

  const snap = await getDocs(q);
  snap.forEach(doc => {
    results.innerHTML += `
      <div onclick="openUser('${doc.id}')">
        👤 ${doc.data().username}
      </div>
    `;
  });
};

window.openUser = uid => {
  location.href = "user.html?uid=" + uid;
};
