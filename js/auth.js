function login(){
 auth.signInWithEmailAndPassword(email.value, password.value)
}

function register(){
 auth.createUserWithEmailAndPassword(email.value, password.value)
 .then(res=>{
  db.collection("users").doc(res.user.uid).set({
    username: email.value.split("@")[0],
    photo: "",
    followers: [],
    following: []
  })
 })
}

auth.onAuthStateChanged(u=>{
 if(u){
  location.href="index.html"
 }
})

