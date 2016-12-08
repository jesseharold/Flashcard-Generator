var ClozeFlashcard = require("./ClozeFlashcard");
var BasicFlashcard = require("./BasicFlashcard");
var fs = require("fs");

var deck = [];
var deckName = "myCards";

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

//console.log(newBasicCard.front);
//console.log(newBasicCard.back);
//console.log(newClozeCard.getPartialText());