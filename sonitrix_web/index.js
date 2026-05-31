const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

// const oscillator = audioCtx.createOscillator();
const gainNode = audioCtx.createGain();

// oscillator.type = 'sine';            
// oscillator.frequency.value = 19500;  

// gainNode.gain.value = 1.0; 

// oscillator.connect(gainNode);
// gainNode.connect(audioCtx.destination);

let oscillator = null;
let default_frequency = 19500;

function startTone (frequency) {
  oscillator = audioCtx.createOscillator();
  oscillator.type = 'sine';
  oscillator.frequency.value = parseInt(frequency);

  oscillator.connect(audioCtx.destination);
  oscillator.start();
}

function stopTone() {
  if (oscillator) {
    oscillator.stop(); 
    oscillator = null; 
  }
}

// interface
const default_button = document.getElementById("default-selection");
const stop_emission = document.getElementById("stop-emission");

// let has_played = 0;
let is_playing = 0;

default_button.onclick = function () {
  switch (is_playing) {
    case 1:
      return false;
  }

  is_playing = 1;
  startTone(default_frequency);

//   switch (has_played) {
//     case 0:
//       has_played = 1;
//       is_playing = 1;
//       startTone(default_frequency);
//       break;
//     case 1:
//       break;
//   }
}

stop_emission.onclick = function () {
  switch (is_playing) {
    case 1:
      stopTone();
      is_playing = 0;
      break;
  }
}