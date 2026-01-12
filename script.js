//value and suit definitions for cards
const values = [2,3,4,5,6,7,8,9,10,11,12,13,14];
const suits = ["♠","♥","♦","♣"];

let deck = [];
let currentCard = null;
let currentPlayer = 0;
let streak = 0;

//defines players in the game
const players = [
    { name: "You", shots: 5, isBot: false, out: false },
    { name: "Bot 1", shots: 5, isBot: true, out: false },
    { name: "Bot 2", shots: 5, isBot: true, out: false },
    { name: "Bot 3", shots: 5, isBot: true, out: false }
];

//gets HTML elements for updating UI
const cardElement = document.getElementById("card");
const logElement = document.getElementById("log");
const higherButton = document.getElementById("higher");

const lowerButton = document.getElementById("lower");

//builds a new deck of cards
function buildDeck() {
    deck = [];
    for (let v of values) {
        for (let s of suits) {
            deck.push({value:v, suit:s});
        }
    }
    shuffle(deck);
}

//shuffles the deck of cards by swapping random cards
function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

//draws a card from the deck, rebuilds if empty
function drawCard() {
    if (deck.length === 0) 
        buildDeck();
    return deck.pop();
}

//updates the UI to reflect current game state
function updateUI() {
    //updates player display of number of shots and active player
    players.forEach((p, i) => {

        const playerElement = document.getElementById("p" + i);
        //console.log(playerElement);
        playerElement.classList.toggle("active", i === currentPlayer);
        playerElement.classList.toggle("out", p.out);
        
        playerElement.querySelector(".shots").innerHTML = "";
        for (shots = 0; shots < p.shots; shots++) {
            playerElement.querySelector(".shots").innerHTML += "🍸";
        }
    });

    //enabes/disables buttons based on if users turn or not
    const isUserTurn = !players[currentPlayer].isBot && !players[currentPlayer].out;
    higherButton.disabled = !isUserTurn;
    lowerButton.disabled = !isUserTurn;
}

//advances to the next player who is not out
function nextPlayer() {
    //skips players who are out
    do {
        currentPlayer = (currentPlayer + 1) % players.length;
        //console.log(players[currentPlayer].name);
    } while (players[currentPlayer].out);

    updateUI();

    //checks for win condition
    if (length = players.filter(p => !p.out).length === 1) {
        logElement.textContent = `${players[currentPlayer].name} wins the game! 🎉`;
        higherButton.disabled = true;
        lowerButton.disabled = true;
        return;
    }

    if (players[currentPlayer].isBot) {
        botTurn();
    }

    //console.log(deck);
}

//processes a guess from the current player
function guess(direction) {
    const next = drawCard();

    //determines if the guess was correct based on the value of the drawn card
    var correct = false;
    if (next.value > currentCard.value && direction === "higher") {
        correct = true;
    } else if (next.value < currentCard.value && direction === "lower") {
        correct = true;
    } else {
        correct = false;
    }   

    //updates the card display to show the drawn card
    cardElement.textContent = next.value + next.suit;

    if (correct) {
        streak++;
        //announce correct guess
        logElement.textContent = `${players[currentPlayer].name} guessed correctly!`;

        //check for users streak reward
        if (streak === 5) {
            logElement.textContent += "5 in a row! Distribute a shot!";
            streak = 0;
        }
    } else {
        streak = 0;
        //deduct a shot for incorrect guess
        players[currentPlayer].shots--;
        logElement.textContent = `${players[currentPlayer].name} guessed wrong! Drink!`;

        //lose condition
        if (players[currentPlayer].shots <= 0) {
            players[currentPlayer].out = true;
            logElement.textContent += "💀 OUT!";
        }
    }

    //set the current card to the newly drawn card
    currentCard = next;
    //advance to the next player
    nextPlayer();
}

//bots take a random guess after a random delay to simulate thinking
function botTurn() {
    setTimeout(() => {
        var choice;
        if (Math.random() > 0.5){
            choice = "higher";
        }else {
            choice = "lower";
        }
        guess(choice);
    }, Math.random() * 3000 + 1000);
}

//event listeners for user buttons
higherButton.addEventListener("click", () => guess("higher"));
lowerButton.addEventListener("click", () => guess("lower"));


//initial setup
buildDeck();
currentCard = drawCard();
cardElement.textContent = currentCard.value + currentCard.suit;
updateUI();
