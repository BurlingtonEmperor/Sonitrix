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

// storage
let frequency_list = [19500, 16000, 20000, 18000, 17000];
let freq_curr = 0;

// interface
const default_button = document.getElementById("default-selection");
const stop_emission = document.getElementById("stop-emission");
const next_frequency = document.getElementById("next-frequency");

const emission_status = document.getElementById("emission-status");

// let has_played = 0;
let is_playing = 0;

default_button.onclick = function () {
  switch (is_playing) {
    case 1:
      return false;
  }

  is_playing = 1;
  startTone(frequency_list[freq_curr]);
  emission_status.style.display = "block";

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

next_frequency.onclick = function () {
  freq_curr += 1;
  if (freq_curr >= (frequency_list.length)) {
    freq_curr = 0;
  }

  default_button.innerText = String(frequency_list[freq_curr] / 1000) + " kHz";
  playOverlap("select");
}

stop_emission.onclick = function () {
  switch (is_playing) {
    case 1:
      stopTone();
      is_playing = 0;
      emission_status.style.display = "none";
      break;
  }
}