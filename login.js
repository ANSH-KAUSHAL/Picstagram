let currentIndex = 0;
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
const totalImages = images.length;

function showNextImage() {
    currentIndex++;
    if (currentIndex >= totalImages) {
        currentIndex = 0;
    }
    const offset = -currentIndex * 300; // 300px is the width of each image
    carousel.style.transform = `translateX(${offset}px)`; // Change to translateX for horizontal sliding
}

setInterval(showNextImage, 3000); // Change image every 3 seconds

document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("login-form");
    let errorDiv = document.getElementById("error1");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const usernameInput = document.querySelector(".login-input").value;
      const passwordInput = document.querySelector(".pass").value;
  
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
  
      if (storedUserData) {
        if (
          storedUserData.username === usernameInput &&
          storedUserData.password === passwordInput
        ) {
          alert("Login successful!");
          window.location.href = "feed.html";
        } else {
          errorDiv.innerText =
            "Incorrect username or password. Please try again.";
        }
      } else {
        errorDiv.innerText = "No user found. Please sign up first.";
      }
    });
  });
  