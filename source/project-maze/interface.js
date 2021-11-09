function buildInterface() {    
    // Show health layout:
    document.querySelector(".health-layout").style.display = "flex";
    
    // Show game info block:
    document.querySelector(".game-info").style.display = "flex";

    // Show game console:
    document.querySelector(".console").style.display = "block";
    
    initMetrics();
    
    // Adjust sizes of elements:
    document.querySelector(".game-info").style.height = gameInfoHeight + "px";
    document.querySelector(".maze-container").style.height = mazeContainerHeight + "px";
    
    // Forbid page scrolling for user:
    document.body.style.overflow = "hidden";
    
    // Add arrow keys processing:
    document.addEventListener("keydown", arrowKeyProc);
    
    initInventory();
}
