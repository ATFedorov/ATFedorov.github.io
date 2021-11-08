// Scroll page to the .mazeWrapper block:
function scrollToMaze() {
  let healthLayout = document.querySelector(".health-layout");
  let healthLayoutCoord = getCoords(healthLayout);
  
  window.scrollTo(0, healthLayoutCoord.top);
}

// Scroll for compensation of one player step:
function scroll(cell) {
  
  let mazeContainer = document.querySelector(".maze-container");
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
  
  switch(direction) {
    
  case "down":
  
    if (+cell.dataset.row > 2) {
      mazeContainer.scrollBy( 0, getMazeCellDim() );
    }
    break;
    
  case "up":
  
    if (+cell.dataset.row < mazeSize - 3) {
      mazeContainer.scrollBy( 0, -getMazeCellDim() );
    }
    break;
    
  case "left":
  
    if (+cell.dataset.column < mazeSize - 4) {
      mazeContainer.scrollBy( -getMazeCellDim(), 0 );
    }
    break;
      
  case "right":
  
    if (+cell.dataset.column > 3) {
      mazeContainer.scrollBy( getMazeCellDim(), 0 );
    }
    break;
  }
}

// Get HTML element coordinates:
function getCoords(elem) {
  
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}
