let currentMoleGrid;
let currentPlantGrid;
let score = 0;
let gameOver = false;
let moleInterval, plantInterval;

window.onload = function () {
    setupGame();

    btnStart = document.getElementById("btn-Start");
    btnStart.addEventListener("click", startGame);
    
    btnReset = document.getElementById("btn-Reset");
    btnReset.addEventListener("click", resetGame);

    clearInterval(moleInterval);
    clearInterval(plantInterval);
}

function startGame() {
    gameOver = false;

    moleInterval = setInterval(setMole, 2000);
    plantInterval = setInterval(setPlant, 2000);

    //hides the start button and displays the reset button when game starts
    document.getElementById("btn-Start").style.display = "none";
    document.getElementById("btn-Reset").style.display = "inline-block";    
}

function resetGame() {
    score = 0;
    document.getElementById("score").innerHTML = score;

    //stops the interval so that it does not produce mole or plant
    clearInterval(moleInterval);
    clearInterval(plantInterval);

    //clears any grid that has a plant or mole
    if (currentMoleGrid) {
        currentMoleGrid.innerHTML = "";
    }

    if (currentPlantGrid) {
        currentPlantGrid.innerHTML = "";
    }

    //hides the reset button and display the start button again
    document.getElementById("btn-Start").style.display = "inline-block";
    document.getElementById("btn-Reset").style.display = "none";
}

function setupGame() {
    for (let i = 0; i < 9; i++) {
        const grid = document.createElement("div");
        grid.id = i.toString();
        document.getElementById("board").appendChild(grid);
        grid.addEventListener("click", clickedTile);
        grid.isClicked = false; //adds a custom property called "isClicked" with value false
    }
}

function getRandomGrid() {
    let randomGrid = Math.floor(Math.random() * 9);
    return randomGrid.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }

    if (currentMoleGrid) {
        currentMoleGrid.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "monty-mole.png";

    let randomGrid = getRandomGrid();

    //re-run the function and call another grid if grid is already occupied with a plant or mole
    //ensures that the mole is generated on a different grid on every interval
    if (currentPlantGrid && currentPlantGrid.id == randomGrid || currentMoleGrid && currentMoleGrid.id == randomGrid) {
        setMole();
    }
    else {
        currentMoleGrid = document.getElementById(randomGrid);
        currentMoleGrid.appendChild(mole);
        currentMoleGrid.isClicked = false; //ensures that when the grid has a mole, user is able to click on it
    }
}

function setPlant() {
    if (gameOver) {
        return;
    }

    if (currentPlantGrid) {
        currentPlantGrid.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "piranha-plant.png";

    let randomGrid = getRandomGrid();

    if (currentMoleGrid && currentMoleGrid.id == randomGrid) {
        setPlant();
    }
    else {
        currentPlantGrid = document.getElementById(randomGrid);
        currentPlantGrid.appendChild(plant);
    }
}

function clickedTile() {
    if (gameOver) {
        return;
    }

    if (this == currentMoleGrid && !currentMoleGrid.isClicked) { //grid can only be clicked when isClicked = false. This prevents user from clicking the grid many times to obtain score and rigged the game.
        score += 1;
        document.getElementById("score").innerHTML = score;
        currentMoleGrid.isClicked = true;  //when grid is clicked, user cannot click on it again.
    }

    if (this == currentPlantGrid) {
        gameOver = true;
        alert("Game Over. Your score is: " + score);
    }
}