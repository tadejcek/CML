let isMobile = window.matchMedia("(max-width: 480px)").matches;
gsap.registerPlugin(TextPlugin);

document.addEventListener("DOMContentLoaded", function () {

    gsap.set(".title", { opacity: 1 }); // da ga ne bo držal pre-hidden
    gsap.set(".reveal-bar", {
        scaleX: 0,
        transformOrigin: "left center"
    });

    const tl = gsap.timeline();

    tl.to(".sun", {
        width: 50,
        height: 50,
        duration: 0,
        background: "radial-gradient(50% 50% at 50% 50%, #FFDC43 0%, #F9E89D 67.79%, #F8F7F0 100%)",
        borderColor: "#fff"
    });

    tl.to(".sun", {
        width: 300,
        height: 300,
        duration: 1.2,
        ease: "easing"
    });

    tl.to(".sun", {
        background: "linear-gradient(180deg, rgba(255, 220, 67, 0.50) 0%, #FFDC43 4.5%, #FFDC43 77.95%)",
        borderColor: "rgba(255, 255, 255, 0.40)",
        boxShadow: "0 0 6px 2px rgba(255, 255, 255, 0.40)",
        duration: 0,
        ease: "none"
    });

    tl.to(".sun", {
        width: isMobile ? 820 : 5073,
        height: isMobile ? 820 : 5073,
        duration: 1.2,
        ease: "power2.out"
    });

    // 4) Sun-glow fade-in (rahlo overlap z rastjo sonca)
    tl.to(".sun-glow", {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.8");

    tl.to(".sun-glow", {
        animation: "sunGlowPulse 3.2s ease-in-out infinite"
    });

    tl.to(".blocks", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.8");

    tl.to(".header", {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.6");

    tl.call(startBlocks);

    /*tl.to(".title", {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.6");*/

    tl.to(".reveal-bar", {
        duration: 0.7,
        scaleX: 1,
        ease: "power3.inOut"
    })
        // opcijsko: malo hkrati “pripeljemo” tekst gor
        .from([".title-main", ".rotating-text"], {
            duration: 0.6,
            y: 20,
            opacity: 0,
            ease: "power2.out"
        }, "-=0.4")
        .to(".reveal-bar", {
            duration: 0.6,
            scaleX: 0,
            transformOrigin: "right center",
            ease: "power3.inOut"
        }, "-=0.2");

    /*tl.add(startDiagonalReveal(), "-=0.2");*/

    tl.to(".paragraph", {
        opacity: 1,
        duration: 1,
        ease: "power3.inOut"
    }, "-=0.6");

    tl.call(startTextRotation);

    tl.to(".contact-bubble", {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.2");

    tl.to(".text", {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.2");

    tl.call(startText);

    tl.to([".logo", ".footer"], {
        opacity: 1,
        duration: 0,
        display: "block"
    });

    tl.to(".wrapper", {
        height: "auto",
        duration: 1,
        ease: "power2.out"
    });

    tl.call(startLogoTrack);

    tl.to(".stamp", {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.6");

    tl.call(startStampRotation);

    tl.to(".text", {
        duration: 0.4,
        text: "",
        ease: "none"
    }, "=1");

    tl.to(".text", {
        duration: 1,
        text: "KMALU",
        ease: "none"
    });

});

/*
document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audio");

    audio.volume = 0;     // tih
    audio.muted = true;   // browser dovoli play

    audio.play().then(() => {

        console.log("Autoplay allowed");
        
        // po 300ms omogočimo normalen zvok in fade-in
        setTimeout(() => {
            audio.muted = false;

            gsap.to(audio, {
                volume: 1,
                duration: 2,
                ease: "power1.out"
            });
        }, 300);

    }).catch(() => {
        console.log("Autoplay blokiran – aktiviramo click fallback");

        document.addEventListener("click", () => {
            audio.muted = false;
            audio.volume = 1;
            audio.play();
        }, { once: true });
    });
});
*/