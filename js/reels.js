db.collection("posts").onSnapshot(s=>{
 reels.innerHTML=""
 s.forEach(v=>{
  reels.innerHTML+=`
   <video src="${v.data().image}" controls autoplay loop></video>
  `
 })
})



