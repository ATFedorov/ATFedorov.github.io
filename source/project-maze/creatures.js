let libEnemies = [
  {
    image: "files/enemy_rat.svg",
    voice: "rat",
    sound_attack: "punch",
    sound_die: "death_rat",
    health: 10,
    damage: 1,
    maxdamage: 6,
    experience: 50,
  },
  {
    image: "files/enemy_cat1.png",
    voice: "meow2",
    sound_attack: "attack_cat2",
    sound_die: "death_cat3",
    health: 14,
    damage: 2,
    maxdamage: 7,
    experience: 125,
  },
  {
    image: "files/enemy_cat2.png",
    voice: "meow3",
    sound_attack: "attack_cat3",
    sound_die: "death_cat2",
    health: 18,
    damage: 2,
    maxdamage: 8,
    experience: 150,
  },
  {
    image: "files/enemy_spider1.png",
    voice: "spider1",
    sound_attack: "attack_spider1",
    sound_die: "death_spider",
    health: 18,
    damage: 3,
    maxdamage: 9,
    experience: 175,
  },
  {
    image: "files/enemy_spider2.svg",
    voice: "spider2",
    sound_attack: "attack_spider2",
    sound_die: "death_spider",
    health: 21,
    damage: 3,
    maxdamage: 10,
    experience: 200,
  },
  {
    image: "files/enemy_bat.svg",
    voice: "bat",
    sound_attack: "attack_bat",
    sound_die: "death_bat2",
    health: 13,
    damage: 2,
    maxdamage: 6,
    experience: 100,
  },
  {
    image: "files/item_doll.svg",
    voice: "zombie",
    sound_attack: "attack_player",
    sound_die: "death_zombie",
    health: 23,
    damage: 3,
    maxdamage: 11,
    experience: 250,
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
  let experience = libEnemies[id].experience;
  
  return { skin, voice, sound_attack, sound_die, health, damage, maxdamage, experience };
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
    cell.dataset.experience = enemy.experience;
    
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
function killCreature(cell, bloodImg) {
  
  if (!cell.classList.contains("creature")) return false;
  
  cell.classList.remove("creature");
  cell.classList.add("blood");
  cell.firstChild.remove();
  let blood = document.createElement("img");
  blood.style.display = "block";
  blood.src = bloodImg;
  blood.width = getImgDim();
  cell.append(blood);
  
  // Update and print experience:
  document.getElementById("experience").textContent = `${experience += +cell.dataset.experience} (NL ${experienceSteps[level + 1]})`;
  postMessage(`+${cell.dataset.experience} exp.`);
  
  // Check experience and level up player if need:
  levelUp(experience);
  
  sound(cell.dataset.sound_die);
  resumeMusic();
  
  return true;
}

function saveCreature(cell) {
  
  if (!cell.classList.contains("creature")) return false;
  
  cell.classList.remove("creature");
  cell.firstChild.remove();
  
  // Update and print experience:
  document.getElementById("experience").textContent = `${experience += 300} (NL ${experienceSteps[level + 1]})`;
  postMessage(`+300 exp.`);
  
  // Check experience and level up player if need:
  levelUp(experience);
  
  return true;
}

function attackCreature(cell) {
  
  if (!cell.classList.contains("creature")) return false;
  
  let creatureHealthBarLayout = document.querySelector(".enemy-health");
  
  creatureHealthBarLayout.style.visibility = "visible";
  
  cell.dataset.health = +cell.dataset.health - diceDamage();
  
  let healthPercent = Math.round( +cell.dataset.health * 100 / +cell.dataset.maxhealth);
  healthPercent = ( healthPercent < 0 ) ? 0 : healthPercent;
  let creatureHealthBar = document.querySelector(".enemy-health .health-bar");
  
  
  creatureHealthBar.style.width = `${healthPercent}%`;
  sound("punch");
  
  setTimeout(() => { creatureHealthBarLayout.style.visibility = "hidden"; }, 5000);
  
  if ( healthPercent == 0 ) {
    killCreature(cell, "files/blood.png");
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
    
    let damage = getRandomNumber(+creature.dataset.damage, +creature.dataset.maxdamage);
    currentHealth -= damage;
    
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
  }, 700);
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
  
  document.querySelector(".inventory").style.display = "none";
}
