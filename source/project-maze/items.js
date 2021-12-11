let libItems = {
    healthPotion: { image: "files/blood-sample.svg", value: 150, sound: "sound_item_gurgle" },
    poison: { image: "files/item_poison.svg", value: 50, sound: "sound_item_gurgle" },
    virus: { image: "files/virus.svg", value: 4, sound: "sound_virus" },
};

let idItems = ["healthPotion", "poison", "virus"];

function addItemIntoMaze(idItem) {
    
    let cell = getCellFromFreeCells();
    cell.classList.add("item");
    cell.dataset.id = idItem;
    cell.dataset.value = libItems[idItem].value;
    cell.dataset.sound = libItems[idItem].sound;
    
    let itemImage = document.createElement("img");
    itemImage.classList.add("itemSkin");
    itemImage.src = libItems[idItem].image;
    itemImage.style.height = "40px";
    
    cell.append(itemImage);
}

function addRandomItemsIntoMaze(nItems) {
    
    for (let i = 0; i < nItems; i++) {
        
        let idItem = idItems[getRandomNumber(0, idItems.length - 1)];
        
        addItemIntoMaze(idItem);
    }
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
            
            let enemies = document.querySelectorAll(".attainable.creature");
            
            switch (cell.dataset.id) {
            case "healthPotion":
            
                currentHealth += +cell.dataset.value;
                currentHealth = (currentHealth > health) ? health : currentHealth;
                
                let healthPercent = Math.round( currentHealth * 100 / health);
                
                let playerHealthBar = document.querySelector(".player-health .health-bar");
                playerHealthBar.style.width = `${healthPercent}%`;
                
                break;
                
            case "poison":
                
                if (enemies.length === 0) return;
                
                for (enemy of enemies) {
                    
                    killCreature(enemy, "files/blood3.png");
                }
                
                break;
                
            case "virus":
                
                if (enemies.length === 0) return;
                
                sound(cell.dataset.sound);
                
                for (enemy of enemies) {
                    
                    let i = 0;
                    setTimeout(function exposeVirus(i) {
                        
                        if (i >= +cell.dataset.value) return;
                        
                        let health = +enemy.dataset.health - +cell.dataset.value;
                        enemy.dataset.health = (health < 0) ? 0 : health;
                        
                        if (+enemy.dataset.health == 0) {
                            killCreature(enemy, "files/blood3.png");
                        }
                        
                        i++;
                        setTimeout(exposeVirus(i), 1000, i);
                    }, 1000, i);
                }
                
                break;
                
            default:
            
                return;
            }
            
            this.classList.add("empty");
            this.lastChild.remove();
            sound(cell.dataset.sound);
        }
    }
}
