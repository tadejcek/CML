gsap.registerPlugin(ScrollTrigger);
let headerAnim = gsap.timeline({ paused: true });

headerAnim.to(".header", {
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderRadius: 80,
    top: "24px",
    margin: window.matchMedia("(max-width: 480px)").matches ? "0 24px" : "0 32px",
    with: "auto",
    padding: window.matchMedia("(max-width: 480px)").matches ? "16px" : "16px 24px",
    duration: 0.35,
    ease: "power2.out"
});

headerAnim.to(".header-logo", {
    width: window.matchMedia("(max-width: 480px)").matches ? "110px" : "130px",
    duration: 0.35,
    ease: "power2.out"
}, "<"); 

headerAnim.to(".header div:first-child", {
    height: window.matchMedia("(max-width: 480px)").matches ?  "32px" : "39px",
    duration: 0.35,
    ease: "power2.out"
}, "<"); 


ScrollTrigger.create({
    start: "62px top",
    onEnter: () => headerAnim.play(),
    onLeaveBack: () => headerAnim.reverse()
});