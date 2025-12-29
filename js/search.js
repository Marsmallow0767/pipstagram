function search(){
 db.collection("users")
 .where("username",">=",q.value)
 .where("username","<=",q.value+"\uf8ff")
 .get()
 .then(s=>{
  res.innerHTML=""
  s.forEach(u=>{
   res.innerHTML+=`<p>${u.data().username}</p>`
  })
 })
}
