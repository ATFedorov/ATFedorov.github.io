let leftUpperCell;

// Scroll page to the .mazeWrapper block:
function scrollToMaze() {
  let healthLayout = document.querySelector(".health-layout");
  let healthLayoutCoord = getCoords(healthLayout);
  
  window.scrollTo(0, healthLayoutCoord.top);
}

// Scroll for compensation of one player step:
function scroll(cell) {
  
  // let mazeContainer = document.querySelector(".maze-container");
  
  switch( getShiftDirection(cell) ) {
    
  case "down":
  
    if (scrollCounterY < maxScrollY && +cell.dataset.row > Math.floor(mazeContainerY / 2)) {
      // mazeContainer.scrollBy( 0, getMazeCellDim() );
      scrollDown();
      leftUpperCell = getCellBelow(leftUpperCell);
      scrollCounterY++;
    }
    break;
    
  case "up":
  
    if (scrollCounterY > 0 && +cell.dataset.row < mazeSize - Math.floor(mazeContainerY / 2) - 1) {
      // mazeContainer.scrollBy( 0, -getMazeCellDim() );
      scrollUp();
      leftUpperCell = getCellAbove(leftUpperCell);
      scrollCounterY--;
    }
    break;
    
  case "left":
  
    if (scrollCounterX > 0 && +cell.dataset.column < mazeSize - Math.floor(mazeContainerX / 2) - 1) {
      // mazeContainer.scrollBy( -getMazeCellDim(), 0 );
      scrollLeft();
      leftUpperCell = getCellLeft(leftUpperCell);
      scrollCounterX--;
    }
    break;
      
  case "right":
  
    if (scrollCounterX < maxScrollX && +cell.dataset.column > Math.floor(mazeContainerX / 2)) {
      // mazeContainer.scrollBy( getMazeCellDim(), 0 );
      scrollRight();
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

function scrollUpByPix() {
    let mazeContainer = document.querySelector(".maze-container");
    mazeContainer.scrollBy(0, -1);
}

function scrollDownByPix() {
    let mazeContainer = document.querySelector(".maze-container");
    mazeContainer.scrollBy(0, 1);
}

function scrollLeftByPix() {
    let mazeContainer = document.querySelector(".maze-container");
    mazeContainer.scrollBy(-1, 0);
}

function scrollRightByPix() {
    let mazeContainer = document.querySelector(".maze-container");
    mazeContainer.scrollBy(1, 0);
}

function scrollUp() {
    distributeFunctionOverTimePartition(scrollUpByPix, getTimePartition());
}

function scrollDown() {
    distributeFunctionOverTimePartition(scrollDownByPix, getTimePartition());
}

function scrollLeft() {
    distributeFunctionOverTimePartition(scrollLeftByPix, getTimePartition());
}

function scrollRight() {
    distributeFunctionOverTimePartition(scrollRightByPix, getTimePartition());
}

function distributeFunctionOverTimePartition(func, partition) {
    setTimeout(function applyToTheNext(partition, index) {
        if (index == partition.length) return;
        func();
        setTimeout(applyToTheNext, partition[index], partition, index + 1);
    }, partition[0], partition, 1);
}
