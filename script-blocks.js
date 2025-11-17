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

    const t  = document.querySelector(".text");

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

        const tWiggleX  = Math.sin(time * 0.9) * 2.2;
        const tWiggleY  = Math.cos(time * 1.4) * 1.6;

        gsap.to(t, {
            x: relX * 80 + tWiggleX,
            y: relY * 100 + tWiggleY,
            duration: 1.8,
            ease: "power3.out",
            overwrite: true
        });

    });
}
