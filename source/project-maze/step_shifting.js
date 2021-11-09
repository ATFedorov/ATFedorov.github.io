let shiftDuration = 0;
let shiftPixDuration = 4; //Duration for shifting through one pixel;
let partition = [];

function shiftUp() {
    distributeFunctionOverTimePartition(shiftUpByPix, getTimePartition());
}

function shiftLeft() {
    distributeFunctionOverTimePartition(shiftLeftByPix, getTimePartition());
}

function shiftDown() {
    distributeFunctionOverTimePartition(shiftDownByPix, getTimePartition());
}

function shiftRight() {
    distributeFunctionOverTimePartition(shiftRightByPix, getTimePartition());
}

// Return regular partition of shift duration:
function getTimePartition() {
    if ( partition.length > 0 ) return partition;

    // Initialize duration of shifting by cell:
    shiftDuration = 4 * getMazeCellDim();
    
    // let norm = Math.floor( shiftDuration / getMazeCellDim() ); // time span per px

    for (let i = 0; i < getMazeCellDim(); i++) {
        
        partition.push(shiftPixDuration);
    }
    
    return partition;
}

function shiftUpByPix() {
    let playerSkin = document.querySelector(".player-skin");
    playerSkin.style.top = ( parseInt(playerSkin.style.top, 10) - 1 ) + "px";
}

function shiftDownByPix() {
    let playerSkin = document.querySelector(".player-skin");
    playerSkin.style.top = ( parseInt(playerSkin.style.top, 10) + 1 ) + "px";
}

function shiftLeftByPix() {
    let playerSkin = document.querySelector(".player-skin");
    playerSkin.style.left = ( parseInt(playerSkin.style.left, 10) - 1 ) + "px";
}

function shiftRightByPix() {
    let playerSkin = document.querySelector(".player-skin");
    playerSkin.style.left = ( parseInt(playerSkin.style.left, 10) + 1 ) + "px";
}

function getShiftDirection(cell) {
  let player = document.querySelector(".player");
  let direction;
  
  switch(cell) {
    
  case getCellBelow(player):
  
    direction = "down";
    break;
    
  case getCellAbove(player):
  
    direction = "up";
    break;
    
  case getCellLeft(player):
  
    direction = "left";
    break;
    
  case getCellRight(player):
  
    direction = "right";
    break;
  }
  
  return direction;
}

// Shift player skin onto the given cell:
function shiftPlayerSkinOnto(cell) {
  
  // let mazeContainer = document.querySelector(".maze-container");
  
  switch( getShiftDirection(cell) ) {
    
  case "down":
  
    shiftDown();
    break;
    
  case "up":
  
    shiftUp();
    break;
    
  case "left":
  
    shiftLeft();
    break;
      
  case "right":
  
    shiftRight();
    break;
  }
}
