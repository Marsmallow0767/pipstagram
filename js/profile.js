const uid=auth.currentUser.uid

db.collection("users").doc(uid).get().then(d=>{
 username.value=d.data().username
})

function save(){
 db.collection("users").doc(uid).update({
  username:username.value
 })
}

db.collection("posts").where("userId","==",uid)
.onSnapshot(s=>{
 grid.innerHTML=""
 s.forEach(p=>{
  grid.innerHTML+=`<img src="${p.data().image}">`
 })
})



