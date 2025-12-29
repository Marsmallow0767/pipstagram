const interests = [];

window.likePost = tag=>{
  interests.push(tag);
  localStorage.setItem("ai", JSON.stringify(interests));
};

export function aiSort(posts){
  const fav = JSON.parse(localStorage.getItem("ai")) || [];

  return posts.sort((a,b)=>{
    let sa = fav.includes(a.tag)?1:0;
    let sb = fav.includes(b.tag)?1:0;
    return sb-sa;
  });
}
