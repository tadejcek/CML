const openButton = document.getElementById("openPopup");
const closeButton = document.getElementById("closePopup");
const overlay = document.getElementById("popup");
const box = document.querySelector(".popup-box");

let isOpen = false;
const tl2 = gsap.timeline({ paused: true });

// OPEN ANIMATION
tl2.to(overlay, {
    opacity: 1,
    duration: 0.25,
    pointerEvents: "auto"
}).to(box, {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out"
    }, "-=0.1");

// TOGGLE POPUP ON openButton CLICK
openButton.addEventListener("click", () => {
    if (!isOpen) {
        isOpen = true;
        tl2.play();
    }
});

// TOGGLE POPUP ON openButton CLICK
closeButton.addEventListener("click", () => {
    if (isOpen) {
        isOpen = false;
        tl2.reverse();
    }
});

overlay.addEventListener("click", (e) => {
    console.log("overlay")
    if (!box.contains(e.target) && isOpen) {
        isOpen = false;
        tl2.reverse();
    }
});
