let libEnemies = [
  {
    image: "files/enemy_rat.svg",
    voice: "rat",
    health: 10,
  },
  {
    image: "files/enemy_cat1.png",
    voice: "meow2",
    health: 20,
  },
  {
    image: "files/enemy_cat2.png",
    voice: "meow3",
    health: 20,
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
  
  return { skin, voice, health };
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
    cell.dataset.voice = enemy.voice;
    
    cell.append(enemy.skin);
    
    total++;
  }
  
  return total;
}

// Add cat (to search for) in maze:
function addCat() {
  
  let cell = getCellFromFreeCells();
  let skin = document.createElement("img");
  
  cell.classList.add("creature");
  cell.dataset.type = "cat";
  cell.dataset.voice = "meow";
  
  skin.classList.add("creature-skin");
  skin.src = "files/cat1.svg";
  skin.width = `${getImgDim(mazeSize)}`;
  skin.style.display = "none";
  
  cell.append(skin);
  
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
  
  sound("punch");
  resumeMusic();
  
  return true;
}

function saveCreature(cell) {
  
  if (!cell.classList.contains("creature")) return false;
  
  cell.classList.remove("creature");
  cell.firstChild.remove();
  
  return true;
}
