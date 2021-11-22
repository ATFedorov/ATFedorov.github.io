let level = 1; // initial level
let health = 40; // initial health
let damage = 2;
let maxdamage = 5;

// experience to level up
let experienceSteps = [
    0,
    500,
    1500,
    3000,
    5000,
    7500,
    10000,
    13000,
    17000,
    25000,
    37000,
];

let healthSteps = [
    0,
    40,
    50,
    65,
    85,
    110,
    140,
    175,
    215,
    260,
    310,
    365,
];

let damageSteps = [
    {damage: 0, maxdamage: 0},
    {damage: 2, maxdamage: 5},
    {damage: 3, maxdamage: 5},
    {damage: 3, maxdamage: 6},
    {damage: 4, maxdamage: 6},
    {damage: 4, maxdamage: 8},
    {damage: 5, maxdamage: 8},
    {damage: 5, maxdamage: 10},
    {damage: 6, maxdamage: 10},
    {damage: 6, maxdamage: 13},
    {damage: 7, maxdamage: 13},
    {damage: 7, maxdamage: 17},
];

function levelUp(experience) {
    
    if ( experience < experienceSteps[level] ) return;
    
    postMessage("Вы повысили свой уровень!");
    soundLevelUp.play();
    
    level++;
    document.getElementById("level").textContent = level;
    health = healthSteps[level];
    document.getElementById("health").textContent = health;
    currentHealth = health;
    damage = damageSteps[level].damage;
    maxdamage = damageSteps[level].maxdamage;
    document.getElementById("damage").textContent = `${damage}-${maxdamage}`;
    document.querySelector(".player-health .health-bar").style.width = "100%";
}
