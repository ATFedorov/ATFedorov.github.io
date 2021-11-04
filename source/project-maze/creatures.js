let libEnemies = [
  {
    image: "files/enemy_rat.svg",
    voice: "rat",
    health: 17,
    strength: 1,
  },
  {
    image: "files/enemy_cat1.png",
    voice: "meow2",
    health: 23,
    strength: 3,
  },
  {
    image: "files/enemy_cat2.png",
    voice: "meow3",
    health: 19,
    strength: 2,
  },
  {
    image: "files/enemy_spider1.png",
    voice: "spider1",
    health: 26,
    strength: 1,
  },
  {
    image: "files/enemy_spider2.svg",
    voice: "spider2",
    health: 16,
    strength: 4,
  },
];

// Get enemy at random:
function getEnemy() {
  
  let id = getRandomNumber(0, libEnemies.length - 1);
  let skin = document.createElement("img");
  skin.classList.add("creature-skin");
  skin.src = libEnemies[id].image;
  skin.width = `${getImgDim(mazeSize)}`;
  skin.style.display = "none";
  let voice = libEnemies[id].voice;
  let health = libEnemies[id].health;
  let strength = libEnemies[id].strength;
  
  return { skin, voice, health, strength };
}

// Get array of enemies, generated at random:
function getEnemies(nEnemies) {
  
  let enemies = [];
  
  for (let i = 0; i < nEnemies; i++) {
    
    enemies.push( getEnemy() );
  }
  
  return enemies;
}

// Add enemies into maze:
function addEnemies(nEnemies) {
  
  let enemies = getEnemies(nEnemies);
  let total = 0;
  
  for (let enemy of enemies) {
    
    let cell = getCellFromFreeCells();
    
    cell.classList.add("creature");
    cell.dataset.type = "enemy";
    cell.dataset.health = enemy.health;
    cell.dataset.maxhealth = enemy.health;
    cell.dataset.voice = enemy.voice;
    cell.dataset.strength = enemy.strength;
    
    cell.append(enemy.skin);
    
    total++;
  }
  
  return total;
}

// Add cat (to search for) in maze:
function addCat() {
  
  let skin = document.createElement("img");
  
  skin.classList.add("creature-skin");
  skin.src = "files/cat1.svg";
  skin.width = `${getImgDim(mazeSize)}`;
  skin.style.display = "none";
  
  let i = getRandomNumber(Math.floor( freeCells.length / 2 ), freeCells.length - 1);
  let index = freeCells[i];
  freeCells.splice(i, 1); // Remove chosen cell from stock
  
  mazeCells[index].classList.add("creature");
  mazeCells[index].dataset.type = "cat";
  mazeCells[index].dataset.voice = "meow";
  
  mazeCells[index].append(skin);
  
  return true;
}

// Kill creature on the given cell:
function killCreature(cell) {
  
  if (!cell.classList.contains("creature")) return false;
  
  cell.classList.remove("creature");
  cell.classList.add("blood");
  cell.firstChild.remove();
  let blood = document.createElement("img");
  blood.style.display = "block";
  blood.src = "files/blood.png";
  blood.width = getImgDim(mazeSize);
  cell.append(blood);
  
  resumeMusic();
  
  return true;
}

function saveCreature(cell) {
  
  if (!cell.classList.contains("creature")) return false;
  
  cell.classList.remove("creature");
  cell.firstChild.remove();
  
  return true;
}

function attackCreature(cell) {
  
  if (!cell.classList.contains("creature")) return false;
  
  let creatureHealthBarLayout = document.querySelector(".enemy-health");
  
  creatureHealthBarLayout.style.visibility = "visible";
  
  cell.dataset.health = +cell.dataset.health - 8; // fix damage for test
  
  let healthPercent = Math.round( +cell.dataset.health * 100 / +cell.dataset.maxhealth);
  healthPercent = ( healthPercent < 0 ) ? 0 : healthPercent;
  let creatureHealthBar = document.querySelector(".enemy-health .health-bar");
  
  
  creatureHealthBar.style.width = `${healthPercent}%`;
  sound("punch");
  
  setTimeout(() => { creatureHealthBarLayout.style.visibility = "hidden"; }, 5000);
  
  if ( healthPercent == 0 ) {
    killCreature(cell);
    return;
  }
  
  attackPlayerBy(cell);
}

function attackPlayerBy(creature) {
  
  let attainableCells = document.querySelectorAll(".attainable");
  
  for (let cell of attainableCells) {
    
    cell.classList.remove("attainable");
  }
  
  setTimeout(() => {
    
    currentHealth -= +creature.dataset.strength;
    
    let healthPercent = Math.round( currentHealth * 100 / health);
    healthPercent = ( healthPercent < 0 ) ? 0 : healthPercent;
    let playerHealthBar = document.querySelector(".player-health .health-bar");
    
    playerHealthBar.style.width = `${healthPercent}%`;
    
    sound("punch");
    
    if( healthPercent == 0 ) {
      
      killPlayer();
      return;
    }
    
    updateAttainableCells();
  }, 900);
}

function killPlayer() {
  
  let player = document.querySelector(".player");
  
  player.classList.add("blood");
  // player.firstChild.remove();
  let blood = document.createElement("img");
  blood.style.display = "block";
  blood.src = "files/blood.png";
  blood.width = getImgDim(mazeSize);
  player.append(blood);
  
  foneMusicButton.click();
  sound("game_over1");
  postMessage("Кажись, игра окончена. Чтобы попробовать снова, обновите страницу. В следующий раз Вам повезет больше!");
}
