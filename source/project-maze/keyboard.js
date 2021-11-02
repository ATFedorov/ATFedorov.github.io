function arrowKeyProc(event) {
  
  event.preventDefault();
  
  // Forbid cheating on repeated using of key:
  if (event.repeat) return;
  
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

function enterKeyProc(event) {
  
  if (event.key !== "Enter") return;
  
  nextLevelButton.click();
  document.removeEventListener("keydown", enterKeyProc);
}
