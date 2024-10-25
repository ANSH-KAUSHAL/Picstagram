var modal = document.getElementById("modal");
var span = document.getElementsByClassName("close")[0];

window.onload = function () {
  if (window.innerWidth >= 1024) {
    modal.style.display = "block";
    let storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData && storedUserData.firstName) {
      let msg = document.getElementById("welcome-msg");
      msg.innerText = "Welcome " + storedUserData.firstName + "❤️";
    }
  } else {
    modal.style.display = "none";
  }
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
