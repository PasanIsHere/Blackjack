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

var dealerHidden; //hidden card of the dealer

var canHit = true;//let's the player(you) hit while their sum <=21

window.onload= function(){
    createDeck();
    shuffleDeck();
    startGame();
    console.log(hidden);
    console.log(dealerSum);
    while(dealerSum < 17){ //Dealer Game Logic if they have < 17 score they must draw.
        let cardImg = document.createElement("img") //creating an image tage
        let card = deck.pop();
        cardImg.src = "./cards/"+ card +".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);

    }
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