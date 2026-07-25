import confetti from "canvas-confetti";

export function celebrate() {
  const colors = ["#1fb0ff", "#ffb703", "#33c05c", "#fb5e42", "#8c52e0"];
  confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 }, colors });
  setTimeout(() => confetti({ particleCount: 60, spread: 100, origin: { y: 0.4 }, colors }), 200);
}

export function bigCelebrate() {
  const colors = ["#1fb0ff", "#ffb703", "#33c05c", "#fb5e42", "#8c52e0"];
  const end = Date.now() + 1500;
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
