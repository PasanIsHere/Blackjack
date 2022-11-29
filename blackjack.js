var NUMBEROFDECKS = 1
var deck;
var dealerSum = 0;
var yourSum = 0;

/* Keeping Track Of Aces
Aces can be either a +1 or +11, if we keep track of the aces a player has
we can simply give them a value of +11 initally, and if the players exceeds a score of  21
we can simply subtract 10 if they have an ace (11-10 = 1 <- the other value of the ace)
so they can keep playing if they want to. This procces can repeat for the amount of aces a player holds.
*/
var dealerAceCount = 0; 
var yourAceCount = 0;

var hidden; //hidden card of the dealer

var canHit = true;//let's the player(you) hit while their sum <=21

window.onload= function(){
    createDeck();
    shuffleDeck();
    startGame();
    console.log(hidden);
    console.log(dealerSum);

}

function createDeck(){
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"]; //Type of Card: C = Club, D = Diamond. H = Hearts, S = Spade
    deck = [];
    //Generates all 52 cards 
    for(let i = 0; i < types.length; i++){
        for(let j = 0; j<values.length; j++){
            deck.push(values[j] + "-"  + types[i]);
        }
    }

    //Adds any additionals decks to the main deck
    if (NUMBEROFDECKS > 1){
        var tempDeck = deck;
        for (let i = 1; i< NUMBEROFDECKS; i++){
            deck = tempDeck.concat(deck);
        }
    }

}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    console.log(deck);

    
}

function startGame(){
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    
    dealerAceCount  += checkAce(hidden);
    drawCard(0);

    console.log(dealerSum);

    for (let i = 0; i< 2; i++){
        drawCard(1);
    }
    console.log(yourSum);

    document.getElementById("hit").addEventListener("click",hit);
    document.getElementById("stand").addEventListener("click",stand);


}

function drawCard(player){
    let cardImg = document.createElement("img") //creating an image tage
    let card = deck.pop();
    cardImg.src = "./cards/"+ card +".png";

    if (player == 0){
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
        return;
    }

    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
    return;
}
function reduceAce(playerSum,playerAceCount){
    while(playerSum>21 && playerAceCount> 0){
        playerSum -= 10;
        playerAceCount -= 1;

    }
    return playerSum;
}
function hit(){
    if(!canHit){
        return;
    }
    drawCard(1);
    if(reduceAce(yourSum,yourAceCount)>21){
        canHit = false;
    }
}

function stand(){
    while(dealerSum < 17){ //Dealer Game Logic if they have < 17 score they must draw.
        drawCard(0);
    }
    dealerSum = reduceAce(dealerSum,dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
    }
    else if (dealerSum > 21) {
        message = "You win!";
    }
    //both you and dealer <= 21
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
}
function getValue(card){
    let data = card.split("-") //card format is 'value-type', splitting by '-' , data[0] will hold value, data[1] will hold the type
    let value = data[0];
    
    if (isNaN(value)){ // Aces, Jacks, Queens, and Kings
        if (value == "Ace"){ //Ace
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card){
    if (card[0]== "A"){ //'value-type' format, if first char is "A" it's an Ace
        return 1;
    }
    return 0;
}