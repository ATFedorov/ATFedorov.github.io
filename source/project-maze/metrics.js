let clientHeight;
let headerHeight;
let gameInfoHeight;
let mazeContainerHeight;
let footerHeight;
let borderSize = 10; // from style.css
let initMazeSize = 5;

function initMetrics() {
    clientHeight = document.documentElement.clientHeight;
    headerHeight = document.querySelector(".health-layout").offsetHeight;
    footerHeight = document.querySelector(".console").offsetHeight;
    mazeContainerHeight = clientHeight - (headerHeight + footerHeight) + borderSize;
    console.log(mazeContainerHeight);
    gameInfoHeight = mazeContainerHeight;
}

function getMazeCellDim() {
  return Math.floor( (mazeContainerHeight - borderSize) / (initMazeSize + 0.5) );
}

function getImgDim() {
  
  return Math.floor( 0.8 * getMazeCellDim() );
}

function getBorderDim() {
  return borderSize;
}
