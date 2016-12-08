var ClozeFlashcard = require("./ClozeFlashcard");
var BasicFlashcard = require("./BasicFlashcard");
var fs = require("fs");

var deck = [];
var deckName = "myCards";

//select create new deck or retrieve existing deck
// if retrieve, name of deck to retrieve, and verify it exists
// if create new deck, prompt user to name deck
//select view cards or add new cards
// prompt user to add card
// select add more cards or save deck
//on save deck, select view deck or add new cards

function makeBasicCard(front, back){
    var newCard = new BasicFlashcard(front, back);
    deck.push(newCard);
}
function makeClozeCard(text, startCloze, endCloze){
    var newCard = new BasicFlashcard(text, startCloze, endCloze);
    deck.push(newCard);
}
function saveDeck(deckName){
    fs.writeFile(deckName + ".json", JSON.stringify(deck), function(error){
        if(error){
            return console.log(error);
        }
        console.log("We wrote to the file " + deckName + ".json");
    });
}
function getDeck(deckName){
    fs.readFile(deckName + ".json", function(error, data){
        deck = JSON.parse(data);
        console.log(deck);
    });
}
function viewCard(cardNumber){
    currentCard = deck[cardNumber];
    if(currentCard.front){
        console.log(currentCard.front);
    } else {
        console.log(currentCard.getPartialText());
    }
    //prompt for key to show back, then
    if(currentCard.back){
        console.log(currentCard.back);
    } else {
        console.log(currentCard.text);
    }
    //prompt for key to show next card in deck, then either view next or exit
}

//console.log(newBasicCard.front);
//console.log(newBasicCard.back);
//console.log(newClozeCard.getPartialText());