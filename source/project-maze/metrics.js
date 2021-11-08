let clientWidth;
let clientHeight;
let headerHeight;
let gameInfoWidth = 260; // from css
let gameInfoHeight;
let footerHeight;
let borderSize = 10; // from style.css
let initMazeSize = 5;
let mazeContainerWidth;
let mazeContainerHeight;
let mazeContainerX;
let mazeContainerY;
let maxScrollX;
let maxScrollY;
let scrollCounterX;
let scrollCounterY;

function initMetrics() {
    clientWidth = document.documentElement.clientWidth;
    clientHeight = document.documentElement.clientHeight;
    headerHeight = document.querySelector(".health-layout").offsetHeight;
    footerHeight = document.querySelector(".console").offsetHeight;
    mazeContainerWidth = clientWidth - gameInfoWidth + borderSize;
    mazeContainerHeight = clientHeight - (headerHeight + footerHeight) + borderSize;
    mazeContainerX = Math.floor( mazeContainerWidth / getMazeCellDim() );
    mazeContainerY = Math.floor( mazeContainerHeight / getMazeCellDim() );
    gameInfoHeight = mazeContainerHeight;
}

function updateScrollMetrics() {
    maxScrollX = (mazeSize - mazeContainerX > 0) ? mazeSize - mazeContainerX : 0;
    maxScrollY = (mazeSize - mazeContainerY > 0) ? mazeSize - mazeContainerY : 0;
    scrollCounterX = 0;
    scrollCounterY = 0;
}

function getMazeCellDim() {
  return Math.floor( (mazeContainerHeight - borderSize) / initMazeSize );
}

function getImgDim() {
  
  return Math.floor( 0.65 * getMazeCellDim() );
}

function getBorderDim() {
  return borderSize;
}
