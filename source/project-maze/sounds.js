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

// Game sounds:
let Sounds = {};

// Initialize game sounds from library:
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
let pressedFoneMusicButton = false;

let musicFone = new Audio();
musicFone.src = `files/fone_music3.mp3`;
musicFone.volume = 0.4;
musicFone.loop = true;

let musicBattle = new Audio();
musicBattle.src = "files/fight1.mp3";
musicBattle.volume = 0.3;
musicBattle.loop = true;

let soundWin = new Audio();
soundWin.src = "files/game-won.mp3";
soundWin.volume = 0.5;

let soundClick = new Audio();
soundClick.src = "files/click.mp3";

foneMusicButton.onclick = function() {
  
  console.log(`previuos: ${pressedFoneMusicButton}`);
  if (pressedFoneMusicButton) {
    
    pressedFoneMusicButton = false;
    stopMusic(pressedFoneMusicButton);
  } else {
    
    pressedFoneMusicButton = true;
    resumeMusic("fone");
  }
  
  console.log(`switched: ${pressedFoneMusicButton}`);
  soundClick.play();
}

// Need to get rid of this function:
function sound(fileName) {
  
  let sound = new Audio();
  sound.src = `files/${fileName}.mp3`; 
  sound.autoplay = true;
}

function stopMusic() {
  
  musicFone.pause();
  musicBattle.pause();
}

function resumeMusic(theme) {
  
  if (!pressedFoneMusicButton) return;
  
  stopMusic();
  
  switch (theme) {
    
  case "fone":
  
    musicFone.play();
    break;
  
  case "battle":
  
    musicBattle.play();
    break;
  }
}
