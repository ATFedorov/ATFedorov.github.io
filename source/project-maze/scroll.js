// Scroll page to the .mazeWrapper block:
function scrollToMaze() {
  let mazeWrapper = document.querySelector(".maze-wrapper");
  let mazeWrapperCoord = getCoords(mazeWrapper);
  
  window.scrollTo(0, mazeWrapperCoord.top);
}

// Vectical croll for compensation of one player step:
function scrollByCell(cell) {
  
  let player = document.querySelector(".player");
  
  switch(player) {
    
  case getCellBelow(cell):
  
    scrollUp();
    break;
    
  case getCellAbove(cell):
  
    scrollDown();
    break;
  }
}

function scrollDown() {
  
  window.scrollBy(0, getMazeCellDim(mazeSize) + getBorderDim(mazeSize));
}

function scrollUp() {
  
  window.scrollBy(0, -(getMazeCellDim(mazeSize) + getBorderDim(mazeSize)));
}

// Get HTML element coordinates:
function getCoords(elem) {
  
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
  };
}
