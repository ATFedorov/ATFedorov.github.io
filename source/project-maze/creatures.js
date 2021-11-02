let libEnemies = [
  {
    image: "files/enemy_rat.svg",
    voice: Sounds["rat"],
    health: 10,
  },
  {
    image: "files/enemy_cat1.png",
    voice: Sounds["meow2"],
    health: 20,
  },
  {
    image: "files/enemy_cat2.png",
    voice: Sounds["meow3"],
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
  
  return { id, skin };
}

// Get array of enemies, generated at random:
function getEnemies(nEnemies) {
  
  let enemies = [];
  
  for (let i = 0; i < nEnemies; i++) {
    
    enemies.push( getEnemy() );
  }
  
  return enemies;
}

// Add enemies in maze:
function addEnemies(nEnemies) {
  
  let enemies = getEnemies(nEnemies);
  let total = 0;
  
  for (let enemy of enemies) {
    
    let cell = getCellFromFreeCells();
    
    cell.classList.add("creature");
    cell.dataset.type = "enemy";
    cell.dataset.id = enemy.id;
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
  cell.firstChild.remove();
  cell.style.background = 'url("files/blood.png") no-repeat center';
  cell.style.backgroundSize = `${getMazeCellDim(mazeSize)}px ${getMazeCellDim(mazeSize)}px`;
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
