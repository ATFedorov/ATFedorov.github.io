let INITIAL_PLAYER_POSITION = 0;
let mazeSize = initMazeSize;
let level = 0;
let nSteps = 0;
let health = 9;
let currentHealth;

let newGameButton = document.querySelector(".new-game-button");
let nextLevelButton = document.querySelector(".menu button.menu-option.next-level");

// Game entry point:
newGameButton.onclick = function() {
  buildInterface(); //for test
  
  let mazeContainer = document.querySelector(".maze-container");
  mazeContainer.style.display = "block";
  mazeContainer.append(createMaze(mazeSize));
  updateStats(); // Do not enterchange this and the next lines! (initMaze use updated level)
  initMaze(mazeSize, INITIAL_PLAYER_POSITION);
  // Update creatures visibility:
  updateVisibility();
  showCreatures();
  giveVoices();
  
  // Play music:
  foneMusicButton.click();
  
  postMessage("Найдите в лабиринте кошку");
  soundClick.play();
  
  // Hide the new game button
  this.style.display = "none";
  
  scrollToMaze();
}

// Create next game level:
nextLevelButton.onclick = function() {
  flushConsole();
  dropMaze();
  mazeSize++;
  
  let mazeContainer = document.querySelector(".maze-container");
  mazeContainer.append(createMaze(mazeSize));
  updateStats(); // Do not enterchange this and the next lines! (initMaze use updated level)
  initMaze(mazeSize, INITIAL_PLAYER_POSITION);
  // Update creatures visibility:
  updateVisibility();
  showCreatures();
  giveVoices();
  resumeMusic();
  
  this.style.display = "none"; // Hide the next game button
  postMessage("Ой, похоже у нас снова кошка пропала. Нет, на этот раз другая... Как здорово, что у Вас уже есть опыт в подобных делах, мы на Вас очень рассчитываем!");
  
  soundClick.play();
}

// Cell procedure for maze cell:
function cellProc() {
  
  if ( !this.classList.contains("attainable") ) return;

  if ( this.classList.contains("creature") ) {
    
    switch(this.dataset.type) {
    case "cat":
      
      saveCreature(this);
      levelUp();
      
      return;
      
    case "enemy":
      
      attackCreature(this);
    
      return;
    
    }
  }
  
  // Scroll (if need) to the new player position:
  scroll(this);
  
  // Move player to the next cell:
  movePlayer(this);
}

function createMaze(mazeSize) {
  let maze = document.createElement("div");
  let mazeCells = [];
  
  maze.classList.add("maze");
  maze.style.borderLeft = `${getBorderDim()}px ridge DarkOliveGreen`;
  maze.style.borderBottom = `${getBorderDim()}px ridge DarkOliveGreen`;
  maze.style.backgroundColor = "lightgray";
  maze.style.backgroundSize = `${getMazeCellDim() / 2}px ${getMazeCellDim() / 2}px`;
  
  // Form maze layout:
  for (let r = 0; r < mazeSize; r++) {
    
    let mazeRow = document.createElement("div");
    
    mazeRow.classList.add("maze-row");
    
    for (let c = 0; c < mazeSize; c++) {
      
      let mazeCell = document.createElement("div");
      
      mazeCell.classList.add("maze-cell");
      mazeCell.dataset.row = `${r}`;
      mazeCell.dataset.column = `${c}`;
      mazeCell.style.borderTop = `${getBorderDim()}px ridge DarkOliveGreen`;
      mazeCell.style.borderRight = `${getBorderDim()}px ridge DarkOliveGreen`;
      mazeCell.style.width = `${getMazeCellDim()}px`;
      mazeCell.style.height = `${getMazeCellDim()}px`;
      
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
      let coin = getRandomNumber(1, 2);
      
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
  initFreeCells(start);
  
  // Add player into start (reserved) position in maze:
  let player = mazeCells[start];
  // Make enrance into maze:
  player.style.borderTop = "";
  
  let skin = document.createElement("img");
  skin.classList.add("player-skin");
  skin.style.top = "0";
  skin.style.left = "0";
  skin.src = getUrlAvatar();
  skin.height = `${getImgDim()}`;
  player.classList.add("player");
  player.dataset.health = health;
  player.append(skin);
  
  updateAttainableCells(player);

  // Add cat in maze:
  addCat();
  
  // Add enemies in maze:
  addEnemies(level);
  
  // Assign cell procedure for maze cells:
  for (let cell of mazeCells) {
    
    cell.onclick = cellProc;
  }
  
  updateScrollMetrics();
  
  // Rewind to start of maze:
  document.querySelector(".maze-container").scrollTo(0, 0);
  
  leftUpperCell = player;
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

// Update cells to move into which is legal for player:
function updateAttainableCells(cell) {
  
  let player = document.querySelector(".player");
  
  // Find previous attainable cells:
  let prevCells = document.querySelectorAll(".attainable");
  
  for (let cell of prevCells) {
    
    cell.classList.remove("attainable");
  }
  
  // Determine cells to move into which is legal:
  let leftCell = getCellLeft(player);
  let rightCell = getCellRight(player);
  let topCell = getCellAbove(player);
  let bottomCell = getCellBelow(player);
  
  if (leftCell !== null && !leftCell.style.borderRight) {
    
    leftCell.classList.add("attainable");
  }
  if (rightCell !== null && !player.style.borderRight) {
    
    rightCell.classList.add("attainable");
  }
  if (topCell !== null && !player.style.borderTop) {
    
    topCell.classList.add("attainable");
  }
  if (bottomCell !== null && !bottomCell.style.borderTop) {
    
    bottomCell.classList.add("attainable");
  }
}

function movePlayer(cell) {
  
  shiftPlayerSkinOnto(cell);
  
  let player = document.querySelector(".player");
  // let playerSkin = document.querySelector(".player-skin");
  player.classList.remove("player");
  // playerSkin.remove();
  
  cell.classList.add("player");
  // cell.append(playerSkin);
  
  // Assign cells to move into which is legal:
  setTimeout(() => { updateAttainableCells(); }, shiftDuration);
  
  // Update and print steps counter:
  document.getElementById("nSteps").textContent = ++nSteps;
  
  // Update creatures visibility:
  updateVisibility();
  showCreatures();
  giveVoices();
  resumeMusic();
  
  // Play sound of one step:
  sound("footstep");
}

function clearMaze() {
  
  let attainables = document.querySelectorAll(".attainable");
  
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
  console.prepend(p);
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
  let levelOutput = document.getElementById("level");
  let healthOutput = document.getElementById("health");
  let stepsOutput = document.getElementById("nSteps");
  
  level++;
  nSteps = 0;
  health += 1;
  currentHealth = health;
  
  levelOutput.textContent = level;
  healthOutput.textContent = health;
  stepsOutput.textContent = nSteps;
  document.querySelector(".player-health .health-bar").style.width = "100%";
}

// End current game level:
function levelUp() {
  
  postMessage("Отлично сработано! Принцесса очень довольна Вашей работой :3");
  clearMaze();
  stopMusic();
  soundWin.play();
  document.querySelector(".maze-container").scrollTo(0, 0);
  // document.querySelector(".maze-container").style.overflow = "hidden";
  nextLevelButton.style.display = "block"; // Show next level button
  // scrollToMaze(); // Scroll to the top of .mazeWrapper element
  
  document.addEventListener("keydown", enterKeyProc);
}
