let libItems = {
    healthPotion: { image: "files/blood-sample.svg", value: 40, sound: "sound_item_gurgle" }
};

function addItemIntoMaze(idItem) {
    let cell = getCellFromFreeCells();
    cell.classList.add("item");
    cell.dataset.id = idItem;
    cell.dataset.value = libItems[idItem].value;
    cell.dataset.sound = libItems[idItem].sound;
    
    let itemImage = document.createElement("img");
    itemImage.src = libItems[idItem].image;
    itemImage.style.height = getImgDim() / 1.5 + "px";
    
    cell.append(itemImage);
}

function takeItem(cell) {
    let inventoryCell = document.querySelector(".inventory-cell.empty");
    if (!inventoryCell) return false;
    
    inventoryCell.classList.remove("empty");
    inventoryCell.dataset.id = cell.dataset.id;
    inventoryCell.dataset.sound = cell.dataset.sound;
    inventoryCell.dataset.value = cell.dataset.value;
    cell.classList.remove("item");
    let item = cell.firstChild;
    item.remove();
    inventoryCell.append(item);
    sound(cell.dataset.sound);
    return true;
}

function initInventory() {
    let inventoryCells = document.querySelectorAll(".inventory-cell");
    
    for (let cell of inventoryCells) {
        
        cell.onclick = function() {
            if ( this.classList.contains("empty") ) return;
            
            this.classList.add("empty");
            this.firstChild.remove();
            
            switch (cell.dataset.id) {
            case "healthPotion":
            
                currentHealth += +cell.dataset.value;
                sound(cell.dataset.sound);
                
                let healthPercent = Math.round( currentHealth * 100 / health);
                healthPercent = ( healthPercent > 100 ) ? 100 : healthPercent;
                
                let playerHealthBar = document.querySelector(".player-health .health-bar");
                playerHealthBar.style.width = `${healthPercent}%`;
                
                break;
            }
        }
    }
}
