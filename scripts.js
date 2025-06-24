// ✅ Function to Show the Correct Section (360° Tour or Gallery)
function showSection(sectionId) {
    document.querySelectorAll('.tour-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// ✅ Ensure JavaScript Runs After Page Loads
document.addEventListener("DOMContentLoaded", function () {

    // ✅ Slideshow Variables
let slideIndex = 0;
let slideInterval; // Store the auto slideshow interval

// ✅ Function to Show Slides
function showSlides(n) {
    let slides = document.querySelectorAll('.gallery-slide');

    if (slides.length === 0) {
        console.error("No slideshow images found.");
        return;
    }

    // Loop back to first image
    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }

    // Hide all slides, then show the correct one
    slides.forEach(slide => (slide.style.display = "none"));
    slides[slideIndex].style.display = "block";
}

// ✅ Function to Change Slides Manually (Button Click)
window.plusSlides = function(n) { // ✅ Ensure Function is Global
    slideIndex += n;
    let slides = document.querySelectorAll('.gallery-slide');

    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    showSlides(slideIndex);
    restartSlideshow(); // Restart auto slideshow when user clicks
};

// ✅ Function to Start Auto Slideshow
function startSlideshow() {
    slideInterval = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 3000); // Change image every 3 seconds
}

// ✅ Function to Restart Auto Slideshow When Clicking Arrows
function restartSlideshow() {
    clearInterval(slideInterval);
    startSlideshow();
}

// ✅ Start Slideshow on Page Load
document.addEventListener("DOMContentLoaded", function () {
    let slides = document.querySelectorAll('.gallery-slide');

    if (slides.length > 0) {
        slides.forEach(slide => (slide.style.display = "none")); // Hide all slides initially
        slides[0].style.display = "block"; // Show the first slide
        startSlideshow(); // Start auto slideshow
    } else {
        console.error("No images found in the slideshow.");
    }
});

    
    // ✅ Scroll Animation for Sections
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(element => {
        observer.observe(element);
    });

    // ✅ Ensure Hero Section Slides In on Page Load
    let hero = document.querySelector(".hero");
    if (hero) {
        hero.classList.add("visible");
    }
});

// ✅ Store 360° Images for Each Location
const panoramaImages = {
    "parking-lot": ["parking-lot1.jpg", "parking-lot2.jpg", "parking-lot3.jpg"],
    "library": ["library1.jpg", "library2.jpg"],
    "lecture-hall": ["lecture-hall1.jpg", "lecture-hall2.jpg", "lecture-hall3.jpg", "lecture-hall4.jpg"],
    "hostel": ["hostel1.jpg", "hostel2.jpg"],
    "sports-complex": ["sports-complex1.jpg", "sports-complex2.jpg", "sports-complex3.jpg"],
    "cafeteria": ["cafeteria1.jpg"],
    "administration": ["administration1.jpg"],
    "auditorium": ["auditorium1.jpg"],
    "faculty-block": ["faculty-block1.jpg", "faculty-block2.jpg", "faculty-block3.jpg", "faculty-block4.jpg"],
    "entrance-gate": ["entrance-gate.jpg"]
};

let currentLocation = "parking-lot";
let currentImageIndex = 0;

// ✅ Function to Load the First Image of a Location
function loadLocation(location) {
    if (!panoramaImages[location]) {
        console.error("No images found for this location.");
        return;
    }

    currentLocation = location;
    currentImageIndex = 0; // Start from the first image
    loadPanorama(panoramaImages[location][currentImageIndex]);

    // ✅ Hide welcome message when a location is clicked
    let welcomeMessage = document.getElementById("welcome-message");
    if (welcomeMessage) {
        welcomeMessage.style.display = "none";
    }

    // ✅ Show navigation buttons only if there are multiple images
    document.getElementById("prev-360").style.display = (panoramaImages[location].length > 1) ? "inline-block" : "none";
    document.getElementById("next-360").style.display = (panoramaImages[location].length > 1) ? "inline-block" : "none";
}


// ✅ Function to Change 360° Images Within a Location
function changePanorama(direction) {
    let images = panoramaImages[currentLocation];

    if (!images || images.length <= 1) return;

    currentImageIndex += direction;

    // Loop back if at the end
    if (currentImageIndex >= images.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = images.length - 1;

    loadPanorama(images[currentImageIndex]);
}

function loadPanorama(image) {
    let container = document.getElementById("panorama");

    if (!container) {
        console.error("Panorama container not found!");
        return;
    }

    container.innerHTML = ""; // Clear previous content

    pannellum.viewer("panorama", {
        type: "equirectangular",
        panorama: "assets/360/" + image,
        projection: "cylindrical", // ✅ Set projection to cylindrical
        autoLoad: true,
        hfov: 1000 // Optional: field of view for better fit
    });
}

// Load image for The Journey
function loadJourney(imageName) {
    const imgElement = document.getElementById("journey-image");
    imgElement.src = "assets/journey/" + imageName;
}
