// Creatures visibility update:
function updateVisibility() {
  
  let viewPoint = document.querySelector(".player");
  let prevVisibles = document.querySelectorAll(".visible");
  
  for (let visible of prevVisibles) {
    
    visible.classList.remove("visible");
  }

  // Look for creatures leftward:
  for (let cell = getCellLeft(viewPoint); cell !== null; cell = getCellLeft(cell)) {
    
    if (cell.style.borderRight) break; // Player can't see through the wall
    
    if (cell.classList.contains("creature") || cell.classList.contains("item")) {
    
      cell.classList.add("visible");
      // cell.dataset.distance = viewPoint.dataset.column - cell.dataset.column;
    }
  }
  
  // Look for creatures rightward:
  for (let cell = viewPoint; cell !== null; cell = getCellRight(cell)) {
    
    if (cell.classList.contains("creature") || cell.classList.contains("item")) {
    
      cell.classList.add("visible");
      // cell.dataset.distance = cell.dataset.column - viewPoint.dataset.column;
    }
    
    if (cell.style.borderRight) break; // Player can't see through the wall
  }
  
  // Look for creatures upward:
  for (let cell = viewPoint; cell !== null; cell = getCellAbove(cell)) {
    
    if (cell.classList.contains("creature") || cell.classList.contains("item")) {
    
      cell.classList.add("visible");
      // cell.dataset.distance = viewPoint.dataset.row - cell.dataset.row;
    }
    
    if (cell.style.borderTop) break; // Player can't see through the wall
  }
  
  // Look for creatures downward:
  for (let cell = getCellBelow(viewPoint); cell !== null; cell = getCellBelow(cell)) {
    
    if (cell.style.borderTop) break; // Player can't see through the wall
    
    if (cell.classList.contains("creature") || cell.classList.contains("item")) {
    
      cell.classList.add("visible");
      // cell.dataset.distance = cell.dataset.row - viewPoint.dataset.row;
    }
  }
  
  // Enemies visibility correction:
  let enemies = document.querySelectorAll('.creature.visible[data-type="enemy"]');
  
  for (let enemy of enemies) {
      
      if (enemy.dataset.column - leftUpperCell.dataset.column >= mazeContainerX ||
          enemy.dataset.row - leftUpperCell.dataset.row >= mazeContainerY) {
              
           enemy.classList.remove("visible");
      }
  }
}

// Show visible creatures:
function showCreatures() {
  
  let hiddenCreatures = document.querySelectorAll(".creature:not(.visible)");
  let hiddenItems = document.querySelectorAll(".item:not(.visible)");
  let visibles = document.querySelectorAll(".visible");
  
  // Hide creatures:
  for (let creature of hiddenCreatures) {
    
    creature.firstChild.style.display = "none";
  }
  
  // Hide items:
  for (let item of hiddenItems) {
    
    item.firstChild.style.display = "none";
  }
  
  // Show creatures and items:
  for (let visible of visibles) {
    
    if (visible.firstChild.style.display == "block") continue;
    
    visible.firstChild.style.display = "block";
    if (!visible.classList.contains("item")) visible.dataset.giveVoice = "true";
  }
}

// Return number of visible enemies:
function countEnemies() {
  let enemies = document.querySelectorAll('.creature.visible[data-type="enemy"]');
  
  return enemies.length;
}
