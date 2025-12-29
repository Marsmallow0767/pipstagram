export function aiRank(posts){
  const interests = JSON.parse(localStorage.getItem("ai")) || {};

  return posts.sort((a,b)=>{
    const sa = interests[a.tag] || 0;
    const sb = interests[b.tag] || 0;
    return sb - sa;
  });
}

export function trainAI(tag){
  const ai = JSON.parse(localStorage.getItem("ai")) || {};
  ai[tag] = (ai[tag] || 0) + 1;
  localStorage.setItem("ai", JSON.stringify(ai));
}

