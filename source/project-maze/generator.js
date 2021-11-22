let mazeCells;
let freeCells;

// Initialize free cells for subsequent functions:
function initFreeCells(start) {
 
  mazeCells = document.querySelectorAll(".maze-cell");
  freeCells = [];
  
  for (let i = 0; i < mazeCells.length; i++) {
    
    freeCells.push(i);
  }
  
  // Cell with [start] index is reserved for player:
  freeCells.splice(start, 1);
}

function getCellFromFreeCells() {
  
  let i = getRandomNumber(0, freeCells.length - 1);
  let index = freeCells[i];
  freeCells.splice(i, 1); // Remove chosen cell from stock
  
  return mazeCells[index];
}

// Get random integer number in interval (lower, upper):
function getRandomNumber(lower, upper) {
  
  return Math.floor(lower + (upper + 1 - lower) * Math.random());
}

function diceDamage() {
    
    return getRandomNumber(damage, maxdamage);
}
