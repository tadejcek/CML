let isMobile = window.matchMedia("(max-width: 480px)").matches;
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollToPlugin);
gsap.registerPlugin(ScrollTrigger);

document.querySelector(".down-button").addEventListener("click", () => {
    gsap.to(window, {
        duration: 1.2,
        scrollTo: ".logo",
        ease: "power3.inOut"
    });
});

document.addEventListener("DOMContentLoaded", function () {

    const tl = gsap.timeline();

    /*tl.to(".sun", {
        width: 50,
        height: 50,
        duration: 0,
        background: "radial-gradient(50% 50% at 50% 50%, #FFDC43 0%, #F9E89D 67.79%, #F8F7F0 100%)",
        borderColor: "#fff"
    });*/

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

    tl.add(startDiagonalReveal(), "-=0.2");

    tl.to(".paragraph", {
        opacity: 1,
        duration: 1,
        ease: "power3.inOut"
    }, "-=0.4");

    tl.call(startTextRotation);

    tl.to([".text"], {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.2");

    tl.to([".contact-bubble", ".down-button"], {
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

    /*tl.to(".wrapper", {
        height: "auto",
        duration: 1,
        ease: "power2.out"
    });*/

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



function startTextRotation() {
    const phrases = [
        "krepijo znanje",
        "informirajo odločanje",
        "sproščajo čas ekip",
        "krajšajo postopke"
    ];

    const tl = gsap.timeline({ repeat: -1 });
    const el = document.querySelector(".rotating-text");

    phrases.forEach((text) => {

        /*tlText.to(el, {
            duration: 0.6,
            opacity: 0,
            y: -10,
            ease: "power2.out"
        });

        tlText.to(el, {
            duration: 0.01,
            text: text 
        });

        tlText.to(el, {
            duration: 0.6,
            opacity: 1,
            y: 0,
            ease: "power2.out"
        });

        tlText.to({}, { duration: 1.2 }); */

        // 1) Fade out / remove old text
        tl.to(el, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                el.innerHTML = ""; // clear text before typing new
            }
        });

        // 2) TYPE new text letter-by-letter
        tl.to(el, {
            duration: text.length * 0.06, // time depends on text length
            onStart: () => { el.innerHTML = ""; },
            onUpdate: function () {
                const progress = this.progress(); // 0 → 1
                const chars = Math.floor(progress * text.length);
                el.innerHTML = text.slice(0, chars);
            },
            opacity: 1,
            ease: "none"
        });

        // 3) Pause after typing finishes
        tl.to({}, { duration: 1.2 });
    });
}

/*function startLogoTrack() {
    gsap.to(".logo-track", {
        x: "-50%",       // premik za polovico (ker je lista podvojena)
        duration: 100,    // hitrost (počasnejše -> več)
        ease: "none",
        repeat: -1       // neskončno
    });
}*/

function startLogoTrack() {

    gsap.to(".logo-track", {
        x: "-50%",
        duration: 100,
        ease: "none",
        repeat: -1,
        paused: true,     // stopirano, dokler ne scrollamo
        scrollTrigger: {
            trigger: ".logo",    // začne se, ko prideš do te sekcije
            start: "top 80%",    // ko je 80% od vrha viewporta
            toggleActions: "play none none none",
            once: true           // zažene samo enkrat
        }
    });
}

function startStampRotation() {
    gsap.to(".stamp", {
        rotation: 360,
        duration: 30,      // čas enega kroga (počasneje = več)
        ease: "none",
        repeat: -1         // neskončno
    });
}

function startDiagonalReveal() {
    const isMobile = window.matchMedia("(max-width: 480px)").matches;
    const lineCount = isMobile ? 4 : 2;
    const lineHeight = isMobile ? 54 : 84; // višina ene “vrstice” v px

    const title = document.querySelector(".title");
    if (!title) return;

    // počisti stare bare, če funkcijo slučajno kličeš večkrat
    const oldBars = title.querySelectorAll(".reveal-bar");
    oldBars.forEach(bar => bar.remove());

    const bars = [];

    for (let i = 0; i < lineCount; i++) {
        const bar = document.createElement("div");
        bar.classList.add("reveal-bar");

        bar.style.position = "absolute";
        bar.style.top = `${i * lineHeight}px`;   // vertikalni zamik po vrsticah
        //bar.style.left     = `${i * 12}px`;           // DIAGONALNI OFFSET
        bar.style.width = "100%";
        bar.style.height = `${lineHeight}px`;       // višina bara (54 / 84)
        bar.style.transformOrigin = "left center";
        bar.style.transform = "scaleX(0)";

        title.appendChild(bar);
        bars.push(bar);
    }

    const tl = gsap.timeline();

    tl.to(".title", { opacity: 1, duration: 0.3 });

    bars.forEach((bar, i) => {
        // bar “zraste” z leve
        tl.to(bar, {
            scaleX: 1,
            duration: 0.6,
            ease: "power3.inOut"
        }, i * 0.15);

        // potem se “odpelje” desno
        tl.to(bar, {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.5,
            ease: "power3.inOut"
        }, i * 0.15 + 0.55);
    });

    return tl;
}

function startBlocks() {

    const b1 = document.querySelector(".block-1");
    const b2 = document.querySelector(".block-2");
    const b3 = document.querySelector(".block-3");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    gsap.ticker.add(() => {
        const relX = mouseX / window.innerWidth - 0.5;
        const relY = mouseY / window.innerHeight - 0.5;

        const time = gsap.ticker.frame / 60;

        // MUCH smaller wiggle values (more elegant)
        const b1WiggleX = Math.sin(time * 1.3) * 2.5;
        const b1WiggleY = Math.cos(time * 1.5) * 1.7;

        const b2WiggleX = Math.sin(time * 1.7) * 2.2;
        const b2WiggleY = Math.cos(time * 1.1) * 1.5;

        const b3WiggleX = Math.sin(time * 1.2) * 2.4;
        const b3WiggleY = Math.cos(time * 1.8) * 1.8;

        gsap.to(b1, {
            x: relX * 40 + b1WiggleX,
            y: relY * 60 + b1WiggleY,
            duration: 1.2,
            ease: "power3.out",
            overwrite: true
        });

        gsap.to(b2, {
            x: relX * 25 + b2WiggleX,
            y: relY * 10 + b2WiggleY,
            duration: 1.4,
            ease: "power3.out",
            overwrite: true
        });

        gsap.to(b3, {
            x: relX * 50 + b3WiggleX,
            y: relY * 35 + b3WiggleY,
            duration: 1.6,
            ease: "power3.out",
            overwrite: true
        });

    });
}

function startText() {

    const t = document.querySelector(".text");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    gsap.ticker.add(() => {
        const relX = mouseX / window.innerWidth - 0.5;
        const relY = mouseY / window.innerHeight - 0.5;

        const time = gsap.ticker.frame / 60;

        const tWiggleX = Math.sin(time * 0.9) * 2.2;
        const tWiggleY = Math.cos(time * 1.4) * 1.6;

        gsap.to(t, {
            x: relX * 80 + tWiggleX,
            y: relY * 100 + tWiggleY,
            duration: 1.8,
            ease: "power3.out",
            overwrite: true
        });

    });
}
