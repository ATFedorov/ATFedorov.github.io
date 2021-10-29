let mazeSize = 6;
let maze = document.querySelector("div.maze");
let table = document.createElement("div");

table.classList.add("table");
table.style.display = "table";
table.style.margin = "0 auto";
table.style.borderCollapse = "collapse";
table.style.borderLeft = "10px solid #28813C";
table.style.borderBottom = "10px solid #28813C";
table.style.backgroundColor = "lightgray";

// Form maze layout:
for (let r = 0; r < mazeSize; r++) {
  
  let row = document.createElement("div");
  
  row.classList.add("row");
  row.style.display = "table-row";
  
  for (let c = 0; c < mazeSize; c++) {
    
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
for (let r = 0; r < mazeSize; r++) {

  for (let c = 0; c < mazeSize; c++) {

    if (r == 0) {
      
      if (c != mazeSize - 1) {
        cells[r * mazeSize + c].style.borderRight = "";
      }
      continue;
    }
    
    if (c == mazeSize - 1) {
      cells[r * mazeSize + c].style.borderTop = "";
      continue;
    }
    
    // Toss a coin:
    let coin = randomIntIn(1, 2);
    
    if (coin == 1) {
      
      cells[r * mazeSize + c].style.borderTop = "";
    } else {
      
      cells[r * mazeSize + c].style.borderRight = "";
    }
  }
}

// Set start position of player in maze:
let playerPos = 0;
cells[playerPos].style.borderTop = "10px solid #28513C";
cells[playerPos].style.backgroundColor = "darkgray";
let player = document.createElement("img");
player.classList.add("player");
player.src = "files/player1.svg";
player.width = "60";
cells[playerPos].append(player);

// Set cat position in maze:
let catPos = randomIntIn(2 * mazeSize, mazeSize ** 2 - 1);
let cat = document.createElement("img");
cat.classList.add("cat");
cat.src = "files/cat1.svg";
cat.width = "60";
cat.style.display = "none";
cells[catPos].append(cat);

// Player movement in maze:
for (let cell of cells) {
  
  cell.onclick = function() {
    let player = document.querySelector(".player");
    let cat = document.querySelector(".cat");
    
    let rowPrev = +player.parentElement.dataset.row;
    let colPrev = +player.parentElement.dataset.column;
    let row = +cell.dataset.row;
    let col = +cell.dataset.column;
    
    let isSameRow = rowPrev == row;
    let isSameCol = colPrev == col;
    let isAdjacenByRow = isSameRow && Math.abs(col - colPrev) == 1;
    let isAdjacenByCol = isSameCol && Math.abs(row - rowPrev) == 1;
    
    let isLegalMove = false;
    let noWallVertical = true;
    let noWallHorizontal = true;

    //Find out whether is there wall on the path:
    if (isAdjacenByRow) {
      
      if (colPrev < col && player.parentElement.style.borderRight !== "") {
        
        noWallVertical = false;
      } else if (col < colPrev && cell.style.borderRight !== "") {
        
        noWallVertical = false;
      }
    }
    
    if (isAdjacenByCol) {
      
      if (row < rowPrev && player.parentElement.style.borderTop !== "") {
        
        noWallHorizontal = false;
      } else if (rowPrev < row && cell.style.borderTop !== "") {
        
        noWallHorizontal = false;
      }
    }

    if (isAdjacenByRow && noWallVertical ||
      isAdjacenByCol && noWallHorizontal) {
      
      isLegalMove = true;
    }
    
    if (!isLegalMove) return;
    
    cell.style.backgroundColor = "darkgray";
    
    if (cell.contains(cat)) {
      
      alert("Вы нашли пропавшую кошку!");
      player.remove();
      cat.remove();
      for (let c of cells) c.style.backgroundColor = "lightgray";
      cells[0].append(cat);
      cells[1].append(player);
    } else {
      
      // Move player on the next cell:
      player.remove();
      cell.append(player);
      
      // Update cat visibility:
      if ( isVisible(player, cat) ) {
        
        cat.style.display = "block";
      } else {
        
        cat.style.display = "none";
      }
    }
  }
}

function randomIntIn(lower, upper) {
  return Math.floor(lower + (upper + 1 - lower) * Math.random());
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

// Return cell above the given cell in table:
function getCellAbove(cell) {
  let row = cell.dataset.row;
  let col = cell.dataset.column;
  
  return document.querySelector(`.cell[data-row="${row - 1}"][data-column="${col}"]`);
}
