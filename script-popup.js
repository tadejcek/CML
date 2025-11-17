const bubble = document.getElementById("openPopup");
const overlay = document.getElementById("popup");
const box = document.querySelector(".popup-box");

const iconOpen = bubble.querySelector(".open");
const iconClose = bubble.querySelector(".close");

let isOpen = false;

// GSAP TIMELINE
const tl2 = gsap.timeline({ paused: true });

// OPEN ANIMATION
tl2.to(overlay, {
    opacity: 1,
    duration: 0.25,
    pointerEvents: "auto"
})
.to(box, {
    opacity: 1,
    y: 0,
    duration: 0.45,
    ease: "power3.out"
}, "-=0.1");


// ICON SWITCH FUNCTION
function updateIcon() {
    if (isOpen) {
        gsap.to(iconOpen, { opacity: 0, scale: 0.8, duration: 0.2 });
        gsap.to(iconClose, { opacity: 1, scale: 1, duration: 0.25 });
    } else {
        gsap.to(iconClose, { opacity: 0, scale: 0.8, duration: 0.2 });
        gsap.to(iconOpen, { opacity: 1, scale: 1, duration: 0.25 });
    }
}

// TOGGLE POPUP ON BUBBLE CLICK
bubble.addEventListener("click", () => {
    isOpen = !isOpen;
    updateIcon();

    if (isOpen) {
        tl2.play();
    } else {
        tl2.reverse();
    }
});

// CLOSE WHEN CLICK OUTSIDE BOX
overlay.addEventListener("click", (e) => {
    if (e.target === overlay && isOpen) {
        isOpen = false;
        updateIcon();
        tl2.reverse();
    }
});
