const audio = document.getElementById("audio");
const btn = document.getElementById("soundBtn");
const bars = Array.from(document.querySelectorAll(".bar"));
const wrapper = document.querySelector(".eq-wrapper");

let audioCtx, source, analyser, dataArray, animationId;

btn.addEventListener("click", async () => {
  // First interaction: setup audio context
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    source = audioCtx.createMediaElementSource(audio);
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    dataArray = new Uint8Array(analyser.frequencyBinCount);

    source.connect(analyser);
    analyser.connect(audioCtx.destination);
  }

  if (audio.paused) {
    // PLAY
    await audio.play();
    wrapper.classList.remove("muted");
    startEq();
  } else {
    // PAUSE
    audio.pause();
    wrapper.classList.add("muted");
    stopEq();
  }
});

function startEq() {
  cancelAnimationFrame(animationId);
  renderFrame();
}

function stopEq() {
  cancelAnimationFrame(animationId);
  bars.forEach(bar => bar.style.transform = "scaleY(1)");
}

function renderFrame() {
  animationId = requestAnimationFrame(renderFrame);

  analyser.getByteFrequencyData(dataArray);

  const perBar = Math.floor(dataArray.length / bars.length);

  bars.forEach((bar, i) => {
    let sum = 0;
    for (let j = i * perBar; j < (i + 1) * perBar; j++) sum += dataArray[j];
    const avg = sum / perBar;

    const scale = 0.4 + (avg / 255) * 1.4;
    bar.style.transform = `scaleY(${scale})`;
  });
}
