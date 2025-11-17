function startTextRotation() {
    const phrases = [
        "vračati čas ljudem.",
        "krepiti znanje ekip.",
        "informirati odločanje.",
        "krajšati postopke."
    ];

    const tlText = gsap.timeline({ repeat: -1 });
    const el = document.querySelector(".rotating-text");

    phrases.forEach((text) => {

        tlText.to(el, {
            duration: 0.6,
            opacity: 0,
            y: -10,
            ease: "power2.out"
        });

        tlText.to(el, {
            duration: 0.01,
            text: text  // <- tukaj se zgodi menjava teksta
        });

        tlText.to(el, {
            duration: 0.6,
            opacity: 1,
            y: 0,
            ease: "power2.out"
        });

        tlText.to({}, { duration: 1.2 }); // pavza med menjavami
    });
}

function startLogoTrack() {
    gsap.to(".logo-track", {
        x: "-50%",       // premik za polovico (ker je lista podvojena)
        duration: 50,    // hitrost (počasnejše -> več)
        ease: "none",
        repeat: -1       // neskončno
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

    const title = document.querySelector(".title");
    const text = title.innerHTML; // shrani original HTML

    // razbij tekst na besede v span-e
    const words = text
        .replace(/\n/g, " ")
        .split(" ")
        .map(w => `<span class="word">${w}&nbsp;</span>`)
        .join("");

    title.innerHTML = words;

    const wordSpans = title.querySelectorAll(".word");

    // izmeri vrstice
    let lines = [];
    let currentLine = [];
    let lastTop = wordSpans[0].offsetTop;

    wordSpans.forEach((word, i) => {
        if (word.offsetTop !== lastTop) {
            lines.push([...currentLine]);
            currentLine = [];
            lastTop = word.offsetTop;
        }
        currentLine.push(word);
    });
    lines.push(currentLine);

    // vrni original content, a dodaj reveal bar-e
    title.innerHTML = text;

    // ponovno najdi vse elemente v originalu (besedilo + rotating-text)
    const contentNodes = Array.from(title.childNodes).filter(n => n.nodeType === 3 || n.nodeType === 1);

    // vstavi reveal bari za vsako vrstico
    const bars = [];

    lines.forEach((line, i) => {
        const bar = document.createElement("div");
        bar.classList.add("reveal-bar");
        bar.style.top = `${i * 1.1}em`;      
        bar.style.left = `${i * 12}px`;       // DIAGONAL OFFSET
        bar.style.width = "100%";
        title.appendChild(bar);
        bars.push(bar);
    });

    // animacija reveal barov (diagonalno)
    const tl = gsap.timeline();

    tl.to(".title", { opacity: 1, duration: 0.3 });

    bars.forEach((bar, i) => {
        tl.to(bar, {
            scaleX: 1,
            duration: 0.6,
            ease: "power3.inOut"
        }, i * 0.15);

        tl.to(bar, {
            scaleX: 0,
            transformOrigin: "right center",
            duration: 0.5,
            ease: "power3.inOut"
        }, i * 0.15 + 0.55);
    });

    return tl;
}


