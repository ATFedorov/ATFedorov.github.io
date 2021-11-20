let libEnemies = [
  {
    image: "files/enemy_rat.svg",
    voice: "rat",
    sound_attack: "punch",
    sound_die: "death_rat",
    health: 17,
    damage: 4,
    maxdamage: 7,
  },
  {
    image: "files/enemy_cat1.png",
    voice: "meow2",
    sound_attack: "attack_cat2",
    sound_die: "death_cat3",
    health: 23,
    damage: 5,
    maxdamage: 9,
  },
  {
    image: "files/enemy_cat2.png",
    voice: "meow3",
    sound_attack: "attack_cat3",
    sound_die: "death_cat2",
    health: 19,
    damage: 5,
    maxdamage: 9,
  },
  {
    image: "files/enemy_spider1.png",
    voice: "spider1",
    sound_attack: "attack_spider1",
    sound_die: "death_spider",
    health: 21,
    damage: 4,
    maxdamage: 8,
  },
  {
    image: "files/enemy_spider2.svg",
    voice: "spider2",
    sound_attack: "attack_spider2",
    sound_die: "death_spider",
    health: 16,
    damage: 7,
    maxdamage: 16,
  },
  {
    image: "files/enemy_bat.svg",
    voice: "bat",
    sound_attack: "punch",
    sound_die: "death_bat",
    health: 13,
    damage: 4,
    maxdamage: 10,
  },
];

// Get enemy at random:
function getEnemy() {
  
  let id = getRandomNumber(0, libEnemies.length - 1);
  let skin = document.createElement("img");
  skin.classList.add("creature-skin");
  skin.src = libEnemies[id].image;
  skin.width = `${getImgDim()}`;
  skin.style.display = "none";
  let voice = libEnemies[id].voice;
  let sound_attack = libEnemies[id].sound_attack;
  let sound_die = libEnemies[id].sound_die;
  let health = libEnemies[id].health;
  let damage = libEnemies[id].damage;
  let maxdamage = libEnemies[id].maxdamage;
  
  return { skin, voice, sound_attack, sound_die, health, damage, maxdamage };
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
    cell.dataset.voice = enemy.voice;
    cell.dataset.sound_attack = enemy.sound_attack;
    cell.dataset.sound_die = enemy.sound_die;
    cell.dataset.health = enemy.health;
    cell.dataset.maxhealth = enemy.health;
    cell.dataset.damage = enemy.damage;
    cell.dataset.maxdamage = enemy.maxdamage;
    
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
  skin.width = `${getImgDim()}`;
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
  blood.width = getImgDim();
  cell.append(blood);
  
  sound(cell.dataset.sound_die);
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
  
  cell.dataset.health = +cell.dataset.health - 9; // fix damage for test
  
  let healthPercent = Math.round( +cell.dataset.health * 100 / +cell.dataset.maxhealth);
  healthPercent = ( healthPercent < 0 ) ? 0 : healthPercent;
  let creatureHealthBar = document.querySelector(".enemy-health .health-bar");
  
  
  creatureHealthBar.style.width = `${healthPercent}%`;
  sound("attack_player");
  
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
    
    currentHealth -= getRandomNumber(+creature.dataset.damage, +creature.dataset.maxdamage);
    
    let healthPercent = Math.round( currentHealth * 100 / health);
    healthPercent = ( healthPercent < 0 ) ? 0 : healthPercent;
    let playerHealthBar = document.querySelector(".player-health .health-bar");
  
    playerHealthBar.style.width = `${healthPercent}%`;
    
    sound(creature.dataset.sound_attack);
    
    if( healthPercent == 0 ) {
      
      killPlayer();
      return;
    }
    
    updateAttainableCells();
  }, 900);
}

function killPlayer() {
  
  let player = document.querySelector(".player");
  let playerSkin = document.querySelector(".player-skin");
  
  playerSkin.remove();
  let ghost = document.createElement("img");
  ghost.src = "files/player_ghost.png";
  ghost.width = getImgDim();
  player.append(ghost);
  
  stopMusic();
  sound("game_over1");
  postMessage("Игра окончена. В следующий раз Вам повезет больше!");
  document.removeEventListener("keydown", digitKeyProc);
}
