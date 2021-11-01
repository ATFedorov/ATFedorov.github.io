let libEnemies = [
  {
    image: "files/enemy_rat.svg",
    voice: Sounds["rat"],
    health: 10,
  },
  {
    image: "files/enemy_cat1.png",
    voice: Sounds["meow2"],
    health: 10,
  },
  {
    image: "files/enemy_cat2.png",
    voice: Sounds["meow3"],
    health: 10,
  },
];

function getEnemyAtRandom() {
  
  let id = getRandomNumber(0, libEnemies.length - 1);
  let enemy = document.createElement("img");
  enemy.classList.add("enemy");
  enemy.src = libEnemies[id].image;
  enemy.width = `${getImgDim(mazeSize)}`;
  enemy.style.display = "none";
  enemy.dataset.id = id;
  
  return enemy;
}

// Generate and return collection of enemies:
function generateEnemies(nEnemies) {
  
  let enemies = [];
  
  for (let i = 0; i < nEnemies; i++) {
    
    enemies.push( getEnemyAtRandom() );
  }
  
  return enemies;
}

// Add enemies in maze:
function addEnemies(nEnemies) {
  
  let enemies = generateEnemies(nEnemies);
  let total = 0;
  
  for (let enemy of enemies) {
    
    let cell = getCellFromFreeCells();
    cell.append(enemy);
    total++;
  }
  
  return total;
}

// Get cat (to search for) in maze:
function addCat() {
  
  let cell = getCellFromFreeCells();
  let cat = document.createElement("img");
  cat.classList.add("cat");
  cat.src = "files/cat1.svg";
  cat.width = `${getImgDim(mazeSize)}`;
  cat.style.display = "none";
  cell.append(cat);
}
