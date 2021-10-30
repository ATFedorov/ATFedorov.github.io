let MAZE_SIZE = 6;
let stepCounter = 0;
let INITIAL_PLAYER_POSITION = 0;

let maze = document.querySelector(".maze");
let mazeCells = createMaze(MAZE_SIZE);
initMaze(INITIAL_PLAYER_POSITION, mazeCells);

document.getElementById("level").textContent = "1";
document.getElementById("stepCounter").textContent = stepCounter;

// Player movement in maze:
for (let cell of mazeCells) {
  
  cell.onclick = function() {
    let player = document.querySelector(".player");
    let cat = document.querySelector(".cat");
    
    if (player === null || cat === null ) return;

    if (!this.classList.contains("attainable")) return;
    
    document.getElementById("stepCounter").textContent = ++stepCounter;
    
    if (cell.contains(cat)) {
      
      postMessage("Поздравляем! Вам удалось найти кошку, а принцесса сияет от счастья. Все ее 13 кошек теперь в полном порядке :)");
      clearMaze();
      sound("level-win");
    } else {
      
      // Move player on the next cell:
      player.remove();
      this.append(player);
      updateCurrentCell(this);
      
      // Play sound of one step:
      sound("footstep");
      
      // Assign cells to move into which is legal:
      updateAttainableCells(this);
      
      // Update cat visibility:
      if ( isVisible(player, cat) ) {
        
        if (cat.style.display == "none") {
          sound("meow");
          cat.style.display = "block";
        }
      } else {
        
        cat.style.display = "none";
      }
    }
  }
}

function createMaze(MAZE_SIZE) {
  let table = document.createElement("div");

  table.classList.add("table");
  table.style.display = "table";
  table.style.margin = "0 auto";
  table.style.borderCollapse = "collapse";
  table.style.borderLeft = "10px solid #28813C";
  table.style.borderBottom = "10px solid #28813C";
  table.style.backgroundColor = "lightgray";
  
  // Form maze layout:
  for (let r = 0; r < MAZE_SIZE; r++) {
    
    let row = document.createElement("div");
    
    row.classList.add("row");
    row.style.display = "table-row";
    
    for (let c = 0; c < MAZE_SIZE; c++) {
      
      let cell = document.createElement("div");
      
      cell.classList.add("cell");
      cell.dataset.row = `${r}`;
      cell.dataset.column = `${c}`;
      cell.style.textAlign = "center";
      cell.style.display = "table-cell";
      cell.style.borderTop = "10px solid #28813C";
      cell.style.borderRight = "10px solid #28813C";
      cell.style.width = "70px";
      cell.style.height = "70px";
      
      row.append(cell);
    }
    
    table.append(row);
  }

  maze.append(table);

  let cells = document.querySelectorAll(".maze .cell");

  // Generate maze (simlest one by binary tree):
  for (let r = 0; r < MAZE_SIZE; r++) {

    for (let c = 0; c < MAZE_SIZE; c++) {

      if (r == 0) {
        
        if (c != MAZE_SIZE - 1) {
          cells[r * MAZE_SIZE + c].style.borderRight = "";
        }
        continue;
      }
      
      if (c == MAZE_SIZE - 1) {
        cells[r * MAZE_SIZE + c].style.borderTop = "";
        continue;
      }
      
      // Toss a coin:
      let coin = randomIntIn(1, 2);
      
      if (coin == 1) {
        
        cells[r * MAZE_SIZE + c].style.borderTop = "";
      } else {
        
        cells[r * MAZE_SIZE + c].style.borderRight = "";
      }
    }
  }
  
  return cells;
}

// @param start - initial player position
function initMaze(start, mazeCells) {
  // Add player into start position in maze:
  let player = document.createElement("img");
  player.classList.add("player");
  player.src = "files/player1.svg";
  player.width = "60";
  mazeCells[start].classList.add("current");
  mazeCells[start].append(player);
  updateAttainableCells(mazeCells[start]);

  // Set cat position in maze:
  let catPos = randomIntIn(2 * MAZE_SIZE, MAZE_SIZE ** 2 - 1);
  let cat = document.createElement("img");
  cat.classList.add("cat");
  cat.src = "files/cat1.svg";
  cat.width = "60";
  cat.style.display = "none";
  mazeCells[catPos].append(cat);
}

function randomIntIn(lower, upper) {
  return Math.floor(lower + (upper + 1 - lower) * Math.random());
}

// Return cell left from the given cell in a maze:
function getCellLeft(cell) {
  let row = +cell.dataset.row;
  let col = +cell.dataset.column;
  
  return document.querySelector(`.cell[data-row="${row}"][data-column="${col - 1}"]`);
}

// Return cell right from the given cell in a maze:
function getCellRight(cell) {
  let row = +cell.dataset.row;
  let col = +cell.dataset.column;
  
  return document.querySelector(`.cell[data-row="${row}"][data-column="${col + 1}"]`);
}

// Return cell above the given cell in a maze:
function getCellAbove(cell) {
  let row = +cell.dataset.row;
  let col = +cell.dataset.column;
  
  return document.querySelector(`.cell[data-row="${row - 1}"][data-column="${col}"]`);
}

// Return cell below the given cell in a maze:
function getCellBelow(cell) {
  let row = +cell.dataset.row;
  let col = +cell.dataset.column;
  
  return document.querySelector(`.cell[data-row="${row + 1}"][data-column="${col}"]`);
}

function isVisible(player, cat) {
  let leftCell, rightCell, topCell, bottomCell;
  
  if (+player.parentElement.dataset.column < +cat.parentElement.dataset.column) {
    
    leftCell = player.parentElement;
    rightCell = cat.parentElement;
  } else {
    
    leftCell = cat.parentElement;
    rightCell = player.parentElement;
  }
  
  if (+player.parentElement.dataset.row < +cat.parentElement.dataset.row) {
    
    topCell = player.parentElement;
    bottomCell = cat.parentElement;
  } else {
    
    topCell = cat.parentElement;
    bottomCell = player.parentElement;
  }
  
  let onTheSameRow = +leftCell.dataset.row == +rightCell.dataset.row;
  let onTheSameCol = +bottomCell.dataset.column == +topCell.dataset.column;
  
  if (onTheSameRow) {
    
    for (let cell = leftCell; cell !== rightCell; cell = cell.nextSibling) {
      
      if (cell.style.borderRight !== "") return false;
    }

    return true;
  }
  
  if (onTheSameCol) {
    
    for (let cell = bottomCell; cell !== topCell; cell = getCellAbove(cell)) {
      
      if (cell.style.borderTop !== "") return false;
    }

    return true;
  }
  
  return false;
}

function updateAttainableCells(cell) {
  // Find previous attainable cells:
  let prevCells = document.querySelectorAll(".attainable");
  
  for (let cell of prevCells) {
    
    cell.classList.remove("attainable");
  }
  
  // Determine cells to move into which is legal:
  let leftCell = getCellLeft(cell);
  let rightCell = getCellRight(cell);
  let topCell = getCellAbove(cell);
  let bottomCell = getCellBelow(cell);
  
  if (leftCell !== null && !leftCell.style.borderRight) {
    
    leftCell.classList.add("attainable");
  }
  if (rightCell !== null && !cell.style.borderRight) {
    
    rightCell.classList.add("attainable");
  }
  if (topCell !== null && !cell.style.borderTop) {
    
    topCell.classList.add("attainable");
  }
  if (bottomCell !== null && !bottomCell.style.borderTop) {
    
    bottomCell.classList.add("attainable");
  }
}

function updateCurrentCell(cell) {
  let prevCell = document.querySelector(".current");
  prevCell.classList.remove("current");
  
  cell.classList.add("current");
}

function clearMaze() {
  let player = document.querySelector(".player");
  let cat = document.querySelector(".cat");
  let current = document.querySelector(".current");
  let attainables = document.querySelectorAll(".attainable");
  
  player.remove();
  cat.remove();
  current.classList.remove("current");
  for (let cell of attainables) cell.classList.remove("attainable");
}

function postMessage(message) {
  let console = document.querySelector(".console");
  let p = document.createElement("p");
  
  p.textContent = "> " + message;
  console.append(p);
}

function sound(fileName) {
  let sound = new Audio();
  sound.src = `files/${fileName}.mp3`; 
  sound.autoplay = true;
}