const soundBank = {};

function preloadSound (key, src) {
  const audio = new Audio(src);
  audio.preload = "auto";
  soundBank[key] = audio;
}

function playOverlap (key) {
  const originalSound = soundBank[key];
  if (!originalSound) return;

  const soundClone = originalSound.cloneNode(true);
  
  soundClone.addEventListener('ended', () => {
    soundClone.remove();
  });

  soundClone.play().catch(err => console.log("Playback interrupted:", err));
}

preloadSound('select', 'select.mp3');