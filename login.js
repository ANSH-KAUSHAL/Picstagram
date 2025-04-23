document.getElementById("login-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:4099/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.message === "Login successful!") {
        alert("Login successful!");
        window.location.href = "feed.html";
      } else {
        document.getElementById("error1").innerText = data.message;
      }
    })
    .catch(err => {
      document.getElementById("error1").innerText = "Something went wrong.";
      console.error(err);
    });
});
