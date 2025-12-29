db.collection("admins").doc(auth.currentUser.uid).get()
.then(d=>{
 if(!d.exists) location.href="/";
});

function deletePost(id){
 db.collection("posts").doc(id).delete();
}

