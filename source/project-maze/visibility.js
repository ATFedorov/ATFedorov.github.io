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
    
    if (!cell.classList.contains("creature")) continue;
    
    cell.classList.add("visible");
  }
  
  // Look for creatures rightward:
  for (let cell = viewPoint; cell !== null; cell = getCellRight(cell)) {
    
    if (cell.style.borderRight) break; // Player can't see through the wall
    
    if (!cell.classList.contains("creature")) continue;
    
    cell.classList.add("visible");
  }
  
  // Look for creatures upward:
  for (let cell = viewPoint; cell !== null; cell = getCellAbove(cell)) {
    
    if (cell.style.borderTop) break; // Player can't see through the wall
    
    if (!cell.classList.contains("creature")) continue;
    
    cell.classList.add("visible");
  }
  
  // Look for creatures downward:
  for (let cell = getCellBelow(viewPoint); cell !== null; cell = getCellBelow(cell)) {
    
    if (cell.style.borderTop) break; // Player can't see through the wall
    
    if (!cell.classList.contains("creature")) continue;
    
    cell.classList.add("visible");
  }
}

// Show visible creatures:
function showCreatures() {
  
  let hiddenCreatures = document.querySelectorAll(".creature:not(.visible)");
  let visibleCreatures = document.querySelectorAll(".creature.visible");
  
  // Hide creatures:
  for (let creature of hiddenCreatures) {
    
    creature.firstChild.style.display = "none";
  }
  
  // Show creatures:
  for (let creature of visibleCreatures) {
    
    if (creature.firstChild.style.display == "block") continue;
    
    creature.firstChild.style.display = "block";
    creature.dataset.giveVoice = "true";
  }
}

// Return number of visible enemies:
function countEnemies() {
  let enemies = document.querySelectorAll('.creature.visible[data-type="enemy"]');
  
  return enemies.length;
}
