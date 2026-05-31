const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

oscillator.type = 'sine';            
oscillator.frequency.value = 19500;  

gainNode.gain.value = 1.0; 

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

oscillator.start();