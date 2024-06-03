console.log('Main loaded');
const diceArray = ["&#9856;", "&#9857;", "&#9858;", "&#9859;", "&#9860", "&#9861"]

let playerCredits = 3;
let computerCredits = 3;
let gameOver = false;
let computerTurn = true;
let mathGenerator = true;
let playerDiceOne;
let playerDiceTwo;
let computerDiceOne;
let computerDiceTwo;
let playerChoice;

let computerDiceOneDiv = document.querySelector(".computer-dice-one");
let computerDiceTwoDiv = document.querySelector(".computer-dice-two");
let playerDiceOneDiv = document.querySelector(".player-dice-one");
let playerDiceTwoDiv = document.querySelector(".player-dice-two");
const textSelector = document.querySelector('.message-box')
const computerCreditsElement = document.querySelector(".computer-credits");
const playerCreditsElement = document.querySelector(".player-credits");

//Deze variabele zorgt er voor dat de dobbelstenen van waardes veranderen.
function rollDie() {
    return Math.floor(Math.random() * 6);
}
//Deze functie zorgt er voor dat er een audio afspeelt aler er wordt geklikt op de pagina.
window.addEventListener('click', () => {
    document.getElementById("song").play()
    loop = true
});

//Deze functie zorgen ervoor dat de CPU/speler een punt erbij of eraf wordt geteld.
function updateCreditsAndCheckGame() {
    if (mathGenerator) {
        if ((playerChoice === 'higher' && computerDiceOne + computerDiceTwo > playerDiceOne + playerDiceTwo) || (playerChoice === 'lower' && computerDiceOne + computerDiceTwo < playerDiceOne + playerDiceTwo)) {
            textSelector.textContent = "The Cpu has gained a point";
            computerCredits += 1;
            playerCredits -= 1;
        } else if ((playerChoice === 'lower' && computerDiceOne + computerDiceTwo > playerDiceOne + playerDiceTwo) || (playerChoice === 'higher' && computerDiceOne + computerDiceTwo < playerDiceOne + playerDiceTwo)) {
            textSelector.textContent = "The Cpu has lost a point";
            computerCredits -= 1;
            playerCredits += 1;
        } else {
            textSelector.textContent = "Draw";
        }
    }
    computerCreditsElement.textContent = computerCredits;
    playerCreditsElement.textContent = playerCredits;

    executeGameOver();
}

//Door behulp van deze functie wordt het spel beeindigt nadat de eind doel wordt berijkt.
function executeGameOver() {
    if (computerCredits <= 0) {
        textSelector.textContent = "The CPU has no credits left. The player has won";
        gameOver = true;
    } else if (playerCredits <= 0) {
        textSelector.textContent = "The player has no credits left. The CPU has won";
        gameOver = true;
    }

    if (computerCredits >= 10) {
        textSelector.textContent = "The CPU has gained the required amount of points. The CPU has won"
        gameOver = true;
    } else if (playerCredits >= 10) {
        textSelector.textContent = "The player has gained the required amount of points. The player has won"
        gameOver = true;
    }

    //Zodra het spel eindigt wordt de "GO" knop geactiveerd
    if (gameOver) {
        go.disabled = false;
        dice.disabled = true;
        higher.disabled = true;
        lower.disabled = true;
        computerCredits = 3;
        playerCredits = 3;
        computerCreditsElement.textContent = computerCredits;
        playerCreditsElement.textContent = playerCredits;
        gameOver = false;
    }

}

//Functie toegevoegd aan de knoppen waardoor ze een bericht aan tonen in de console.log (wordt later aangepast dat ze een plaat daarvan een nummer aantonen)
const higher = document.querySelector(".higher-button");
higher.disabled = true;
higher.addEventListener('click', function () {
    playerChoice = 'higher';
    textSelector.textContent = "You chose higher"
    higher.disabled = true;
    lower.disabled = true;
    dice.disabled = false;
    go.disabled = true;
    computerTurn = false;
});

const lower = document.querySelector(".lower-button");
lower.disabled = true;
lower.addEventListener('click', function () {
    playerChoice = 'lower';
    textSelector.textContent = "You chose lower"
    lower.disabled = true;
    higher.disabled = true;
    dice.disabled = false;
    go.disabled = true;
    computerTurn = false;
});
//Deze functie zorgt ervoor dat de dobbel stenen gerold worden. De "lower" en "higher" knop staan uit voordat dit gebeurt.
const dice = document.querySelector(".dice-button");
dice.disabled = true;
dice.addEventListener('click', function () {
    if (computerTurn) {
        computerDiceOne = rollDie();
        computerDiceTwo = rollDie();
        computerDiceOneDiv.innerHTML = diceArray[computerDiceOne];
        computerDiceTwoDiv.innerHTML = diceArray[computerDiceTwo];
        dice.disabled = true;
        higher.disabled = false;
        lower.disabled = false;
    } else {
        playerDiceOne = rollDie();
        playerDiceTwo = rollDie();
        playerDiceOneDiv.innerHTML = diceArray[playerDiceOne];
        playerDiceTwoDiv.innerHTML = diceArray[playerDiceTwo];
        updateCreditsAndCheckGame();
    }
    computerTurn = !computerTurn;
});
//Deze functie zorgt ervoor dat het spel begint. Alle andere knoppen staan uit voordat dit gebeurt.
const go = document.querySelector(".go-button");
go.addEventListener('click', function () {
    textSelector.textContent = "CPU's turn"
    go.disabled = true;
    dice.disabled = false;
});