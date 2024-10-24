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
