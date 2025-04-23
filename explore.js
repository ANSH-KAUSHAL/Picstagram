let storedUserData = JSON.parse(localStorage.getItem("userData"));
console.log("Logged in user:", storedUserData);

function likePost(postId) {
  fetch("http://localhost:4099/like", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId, username: storedUserData?.username })
  })
    .then(res => res.json())
    .then(data => {
      alert("❤️ Post liked! Likes: " + data.likes);
    })
    .catch(err => console.error("Like Error:", err));
}

function unlikePost(postId) {
  fetch("http://localhost:4099/unlike", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId, username: storedUserData?.username })
  })
    .then(res => res.json())
    .then(data => {
      alert("💔 Post unliked. Likes: " + data.likes);
    })
    .catch(err => console.error("Unlike Error:", err));
}
