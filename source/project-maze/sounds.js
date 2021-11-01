let libSounds = [
  {
    id: "meow",
    src: "files/meow.mp3",
  },
  {
    id: "meow2",
    src: "files/meow2.mp3",
  },
  {
    id: "meow3",
    src: "files/meow3.mp3",
  },
  {
    id: "rat",
    src: "files/rat.mp3",
  },
];

let Sounds = {};

// Initialize sounds from library:
for (let libSound of libSounds) {
  
  initSound(libSound);
}

// Initialize given sound from library:
function initSound(libSound) {
  
  let sound = new Audio();
  sound.src = libSound.src;
  
  Sounds[libSound.id] = sound;
}

let foneMusicButton = document.querySelector("button.fone-music");
let isPlaying = true; // User want to listen fone music (clicked button .fone-music)

let musicFone = new Audio();
musicFone.src = `files/fone_music3.mp3`;
musicFone.volume = 0.4;
musicFone.loop = true;

let musicBattle = new Audio();
musicBattle.src = "files/fight1.mp3";
musicBattle.volume = 0.3;

let soundWin = new Audio();
soundWin.src = "files/game-won.mp3";
soundWin.volume = 0.5;

let soundClick = new Audio();
soundClick.src = "files/click.mp3";

foneMusicButton.onclick = function() {
  
  if (isPlaying) {
    
    stopMusic();
    isPlaying = false;
  } else {
    
    musicFone.play();
    isPlaying = true;
  }
  
  soundClick.play();
}

function sound(fileName) {
  let sound = new Audio();
  sound.src = `files/${fileName}.mp3`; 
  sound.autoplay = true;
}

// let g_theme = "fone";

// function switchMusic(theme) {
  
  // if (g_theme === theme) return;
  
  // switch (theme) {
  // case "fone":
    // musicBattle.pause();
    // foneMusic.play();
    // g_theme = "fone";
    // break;
  
  // case "battle":
    // foneMusic.pause();
    // musicBattle.play();
    // g_theme = "battle";
    // break;
  // }
// }

// function stopMusic() {
  // switch (g_theme) {
  // case "fone":
    // foneMusic.pause();
    // break;
  
  // case "battle":
    // musicBattle.pause();
    // break;
  // }
  // g_theme = "fone";
// }

function stopMusic() {
  
  musicFone.pause();
  musicBattle.pause();
}
