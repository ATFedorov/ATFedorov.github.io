let INITIAL_PLAYER_POSITION = 0;
let MAZE_DIM = 600; // px
let mazeSize = 4;
let levelCounter = 0;
let stepCounter = 0;

let newGameButton = document.querySelector(".menu button.menu-option.new-game");
let nextLevelButton = document.querySelector(".menu button.menu-option.next-level");
let levelOutput = document.getElementById("level");
let stepsOutput = document.getElementById("stepCounter");

// Game entry point:
newGameButton.onclick = function() {
  let mazeWrapper = document.querySelector(".maze-wrapper");
  mazeWrapper.append(createMaze(mazeSize));
  initMaze(mazeSize, INITIAL_PLAYER_POSITION);
  updateStats();
  
  this.style.display = "none"; // Hide the new game button
  postMessage("Найдите в лабиринте кошку");
}

// Create next game level:
nextLevelButton.onclick = function() {
  flushConsole();
  dropMaze();
  mazeSize++;
  
  let mazeWrapper = document.querySelector(".maze-wrapper");
  mazeWrapper.append(createMaze(mazeSize));
  initMaze(mazeSize, INITIAL_PLAYER_POSITION);
  updateStats();
  
  this.style.display = "none"; // Hide the next game button
  postMessage("Ой, похоже у нас снова кошка пропала. Нет, на этот раз другая... Как здорово, что у Вас уже есть опыт в подобных делах, мы на Вас очень рассчитываем!");
}

// Cell procedure for maze cell:
function cellProc() {
  let player = document.querySelector(".player");
  let cat = document.querySelector(".cat");
  
  if ( player === null || cat === null ) return;

  if ( !this.classList.contains("attainable") ) return;

  document.getElementById("stepCounter").textContent = ++stepCounter;

  if ( this.contains(cat) ) {
    
    postMessage("Отлично сработано! Принцесса очень довольна Вашей работой :3");
    clearMaze();
    
    foneMusic.pause();
    isPlaying = false;
    sound("game-won");
    nextLevelButton.style.display = "block"; // Show next level button
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
      
      if ( cat.style.display == "none" ) {
        
        sound("meow");
        cat.style.display = "block";
      }
    } else {
      
      cat.style.display = "none";
    }
  }
}

function createMaze(mazeSize) {
  let maze = document.createElement("div");
  let mazeCells = [];
  
  maze.classList.add("maze");
  maze.style.display = "table";
  maze.style.margin = "0 auto";
  maze.style.borderCollapse = "collapse";
  maze.style.borderLeft = `${getBorderDim(mazeSize)}px solid #28813C`;
  maze.style.borderBottom = `${getBorderDim(mazeSize)}px solid #28813C`;
  maze.style.backgroundColor = "lightgray";
  
  // Form maze layout:
  for (let r = 0; r < mazeSize; r++) {
    
    let mazeRow = document.createElement("div");
    
    mazeRow.classList.add("maze-row");
    mazeRow.style.display = "table-row";
    
    for (let c = 0; c < mazeSize; c++) {
      
      let mazeCell = document.createElement("div");
      
      mazeCell.classList.add("maze-cell");
      mazeCell.style.display = "table-cell";
      mazeCell.dataset.row = `${r}`;
      mazeCell.dataset.column = `${c}`;
      mazeCell.style.textAlign = "center";
      mazeCell.style.borderTop = `${getBorderDim(mazeSize)}px solid #28813C`;
      mazeCell.style.borderRight = `${getBorderDim(mazeSize)}px solid #28813C`;
      mazeCell.style.width = `${getMazeCellDim(mazeSize)}px`;
      mazeCell.style.height = `${getMazeCellDim(mazeSize)}px`;
      
      mazeRow.append(mazeCell);
      mazeCells.push(mazeCell);
    }
    
    maze.append(mazeRow);
  }

  // Generate maze (simlest one by binary tree):
  for (let r = 0; r < mazeSize; r++) {

    for (let c = 0; c < mazeSize; c++) {

      if (r == 0) {
        
        if (c != mazeSize - 1) {
          mazeCells[r * mazeSize + c].style.borderRight = "";
        }
        continue;
      }
      
      if (c == mazeSize - 1) {
        mazeCells[r * mazeSize + c].style.borderTop = "";
        continue;
      }
      
      // Toss a coin:
      let coin = randomIntIn(1, 2);
      
      if (coin == 1) {
        
        mazeCells[r * mazeSize + c].style.borderTop = "";
      } else {
        
        mazeCells[r * mazeSize + c].style.borderRight = "";
      }
    }
  }
  
  return maze;
}

// @param start - initial player position
function initMaze(mazeSize, start) {
  let mazeCells = document.querySelectorAll(".maze-cell");
  
  // Add player into start position in maze:
  let player = document.createElement("img");
  player.classList.add("player");
  player.src = "files/player1.svg";
  player.width = `${getImgDim(mazeSize)}`;
  mazeCells[start].classList.add("current");
  mazeCells[start].append(player);
  updateAttainableCells(mazeCells[start]);

  // Set cat position in maze:
  let catPos = randomIntIn(2 * mazeSize, mazeSize ** 2 - 1);
  let cat = document.createElement("img");
  cat.classList.add("cat");
  cat.src = "files/cat1.svg";
  cat.width = `${getImgDim(mazeSize)}`;
  cat.style.display = "none";
  mazeCells[catPos].append(cat);
  
  // Assign cell procedure for maze cells:
  for (let cell of mazeCells) {
    
    cell.onclick = cellProc;
  }
}

function randomIntIn(lower, upper) {
  return Math.floor(lower + (upper + 1 - lower) * Math.random());
}

// Return cell left from the given cell in a maze:
function getCellLeft(cell) {
  let row = +cell.dataset.row;
  let col = +cell.dataset.column;
  
  return document.querySelector(`.maze-cell[data-row="${row}"][data-column="${col - 1}"]`);
}

// Return cell right from the given cell in a maze:
function getCellRight(cell) {
  let row = +cell.dataset.row;
  let col = +cell.dataset.column;
  
  return document.querySelector(`.maze-cell[data-row="${row}"][data-column="${col + 1}"]`);
}

// Return cell above the given cell in a maze:
function getCellAbove(cell) {
  let row = +cell.dataset.row;
  let col = +cell.dataset.column;
  
  return document.querySelector(`.maze-cell[data-row="${row - 1}"][data-column="${col}"]`);
}

// Return cell below the given cell in a maze:
function getCellBelow(cell) {
  let row = +cell.dataset.row;
  let col = +cell.dataset.column;
  
  return document.querySelector(`.maze-cell[data-row="${row + 1}"][data-column="${col}"]`);
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

function dropMaze() {
  let maze = document.querySelector(".maze");
  maze.remove();
}

// Post message into game console:
function postMessage(message) {
  let console = document.querySelector(".console");
  let p = document.createElement("p");
  p.classList.add("console-message");
  
  p.textContent = "> " + message;
  console.append(p);
}

function sound(fileName) {
  let sound = new Audio();
  sound.src = `files/${fileName}.mp3`; 
  sound.autoplay = true;
}

// Remove all messages from game console:
function flushConsole() {
  let messages = document.querySelectorAll(".console-message");
  
  for (let message of messages) {
    message.remove();
  }
}

// Update statictics for the level:
function updateStats() {
  levelCounter++;
  stepCounter = 0;
  
  levelOutput.textContent = levelCounter;
  stepsOutput.textContent = stepCounter;
}

function getMazeCellDim(mazeSize) {
  return Math.min( Math.floor( MAZE_DIM / mazeSize ), 100 );
}

function getImgDim(mazeSize) {
  return Math.floor( 0.85 * getMazeCellDim(mazeSize) );
}

function getBorderDim(mazeSize) {
  return Math.floor( 0.15 * getMazeCellDim(mazeSize) );
}
