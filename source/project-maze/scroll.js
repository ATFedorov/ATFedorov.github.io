let leftUpperCell;

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
  
    if (scrollCounterY < maxScrollY && +cell.dataset.row > Math.floor(mazeContainerY / 2)) {
      mazeContainer.scrollBy( 0, getMazeCellDim() );
      leftUpperCell = getCellBelow(leftUpperCell);
      scrollCounterY++;
    }
    break;
    
  case "up":
  
    if (scrollCounterY > 0 && +cell.dataset.row < mazeSize - Math.floor(mazeContainerY / 2) - 1) {
      mazeContainer.scrollBy( 0, -getMazeCellDim() );
      leftUpperCell = getCellAbove(leftUpperCell);
      scrollCounterY--;
    }
    break;
    
  case "left":
  
    if (scrollCounterX > 0 && +cell.dataset.column < mazeSize - Math.floor(mazeContainerX / 2) - 1) {
      mazeContainer.scrollBy( -getMazeCellDim(), 0 );
      leftUpperCell = getCellLeft(leftUpperCell);
      scrollCounterX--;
    }
    break;
      
  case "right":
  
    if (scrollCounterX < maxScrollX && +cell.dataset.column > Math.floor(mazeContainerX / 2)) {
      mazeContainer.scrollBy( getMazeCellDim(), 0 );
      leftUpperCell = getCellRight(leftUpperCell);
      scrollCounterX++;
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
