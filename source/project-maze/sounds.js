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
let pressedFoneMusicButton = true;

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
  
  if (pressedFoneMusicButton) {
    
    pressedFoneMusicButton = false;
    stopMusic();
  } else {
    
    pressedFoneMusicButton = true;
    resumeMusic();
  }
  
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

let g_theme = "fone";

function resumeMusic() {
  
  if (!pressedFoneMusicButton) return;
  
  let music;
  let theme = ( countEnemies() > 0 ) ? "battle" : "fone";
  
  switch (theme) {
    
  case "fone":
  
    music = musicFone;
    break;
    
  case "battle":
  
    music = musicBattle;
    break;
  }
  
  if (theme === g_theme) {
    
    if (music.paused) music.play();
  } else {
    
    stopMusic();
    music.play();
    g_theme = theme;
  }
}

// Visible creature give its voice:
function giveVoice(cellEnemy) {
  
  let enemy = libEnemies[cellEnemy.dataset.id];
  
  if (cellEnemy.dataset.giveVoice) {
    
    enemy.voice.play();
    cellEnemy.dataset.giveVoice = "";
  }
}

// Visible creatures give there voices:
function giveVoices() {
  
  let visibleCat = document.querySelector('.creature.visible[data-type="cat"]');
  let visibleEnemies = document.querySelectorAll('.creature.visible[data-type="enemy"]');
  
  if (visibleCat?.dataset.giveVoice) {
    Sounds["meow"].play();
    visibleCat.dataset.giveVoice = "";
  }
  
  for (let enemy of visibleEnemies ) {
    giveVoice(enemy);
  }
}
