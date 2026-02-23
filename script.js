window.addEventListener("DOMContentLoaded", initGallery);

function initGallery() {

    const layerA = document.getElementById("layerA");
    const layerB = document.getElementById("layerB");
    const placeholder = document.querySelector(".placeholder");
    const titleDiv = document.getElementById("imageTitle");

    const images = document.querySelectorAll(".gallery img");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next-btn");

    let currentIndex = -1;
    let activeLayer = layerA;
    let inactiveLayer = layerB;

    // keyboard accessibility
    images.forEach(img => img.setAttribute("tabindex", "0"));

    function showImage(index) {

        if (images.length === 0) return;

        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        if (index === currentIndex) return;

        currentIndex = index;

        // update active thumbnail
        images.forEach(img => img.classList.remove("active"));
        images[index].classList.add("active");

        const newSrc = images[index].src;

        // set new image to inactive layer
        inactiveLayer.style.backgroundImage = `url("${newSrc}")`;
        inactiveLayer.style.opacity = "1";

        // hide active layer
        activeLayer.style.opacity = "0";

        // swap layers immediately
        const temp = activeLayer;
        activeLayer = inactiveLayer;
        inactiveLayer = temp;

        placeholder.style.opacity = "0";
        titleDiv.textContent = images[index].alt;
    }

    // Hover
    images.forEach((img, index) => {
        img.addEventListener("mouseenter", () => showImage(index));
    });

    // Keyboard
    images.forEach((img, index) => {
        img.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                showImage(index);
            }
        });
    });

    // Buttons
    prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
    nextBtn.addEventListener("click", () => showImage(currentIndex + 1));
}