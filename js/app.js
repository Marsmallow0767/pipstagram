// Firebase
firebase.initializeApp({
  apiKey: "API_KEY",
  authDomain: "pipstagram-5b98e.firebaseapp.com",
  projectId: "pipstagram-5b98e",
});

const auth = firebase.auth();
const db = firebase.firestore();

// GİRİŞ
function login() {
  auth.signInWithEmailAndPassword(
    email.value,
    password.value
  );
}

// KAYIT
function register() {
  auth.createUserWithEmailAndPassword(
    email.value,
    password.value
  ).then(res => {
    db.collection("users").doc(res.user.uid).set({
      username: email.value.split("@")[0]
    });
  });
}

// AUTH STATE
auth.onAuthStateChanged(user => {
  if (user) {
    authDiv.style.display = "none";
    app.style.display = "block";
    loadFeed();
  }
});

// POST PAYLAŞ
function addPost() {
  db.collection("posts").add({
    userId: auth.currentUser.uid,
    image: imageUrl.value,
    caption: caption.value,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// FEED
function loadFeed() {
  db.collection("posts")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      feed.innerHTML = "";
      snapshot.forEach(doc => {
        const p = doc.data();
        feed.innerHTML += `
          <div class="post">
            <img src="${p.image}">
            <p>${p.caption}</p>
          </div>
        `;
      });
    });
}

// SEARCH
function searchUser() {
  db.collection("users")
    .where("username", ">=", search.value)
    .where("username", "<=", search.value + "\uf8ff")
    .get()
    .then(res => {
      searchResult.innerHTML = "";
      res.forEach(doc => {
        searchResult.innerHTML += `<p>${doc.data().username}</p>`;
      });
    });
}










