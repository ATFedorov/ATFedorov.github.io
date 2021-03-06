function arrowKeyProc(event) {
  
  event.preventDefault();
  
  // Forbid cheating on repeated using of key:
  // if (event.repeat) return;
  
  let currentCell = document.querySelector(".maze-cell.player");
  let nextCell = null;
  
  switch (event.key) {
    
  case "ArrowUp":
  
    nextCell = getCellAbove(currentCell);
    break;
    
  case "ArrowRight":
  
    nextCell = getCellRight(currentCell);
    break;
  
  case "ArrowDown":
  
    nextCell = getCellBelow(currentCell);
    break;
    
  case "ArrowLeft":
  
    nextCell = getCellLeft(currentCell);
    break;
  }
  
  if (nextCell === null) return;
  
  nextCell.click();
}

// Pressing to level up:
function enterKeyProc(event) {
  
  if (event.key !== "Enter") return;
  
  nextMapButton.click();
  document.removeEventListener("keydown", enterKeyProc);
}

function digitKeyProc(event) {
    
    let inventarCellNumber = +event.key.match(/\d/);
    
    if(inventarCellNumber === 0) return;
    
    document.querySelector(`.inventory-cell:nth-of-type(${inventarCellNumber})`).click();
}
