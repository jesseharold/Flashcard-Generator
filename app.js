var ClozeFlashcard = require("./ClozeFlashcard");
var BasicFlashcard = require("./BasicFlashcard");
var BasicFlashcard = require("./Deck");
var inquirer = require("inquirer");
var fs = require("fs");
var currentDeck;

function startInterface(){
    // user selects create new deck or retrieve existing deck
    inquirer.prompt([
        {
            type: "list",
            name: "action"
            message: "Welcome to Flashcards. What would you like to do?",
            choices: ["Create a new deck of cards", "Load an existing deck of cards"]
        }, {
            name: "deckName",
            message: "What is the name of your deck?"
        }, {
            name: "userName",
            message: "What is your name?"
        }
    ]).then(function(answers){
        currentDeck = new Deck(answers.deckName, answers.userName);
        if (answers.action === "Create a new deck of cards"){
            createDeckInterface();
        } else {
            // verify deck exists
            if (!fs.existsSync(answers.deckName + ".json")){
                console.log("There is no deck by that name, try again.");
                startInterface();
            } else {
                currentDeck.loadDeck();
                // verify this person owns the deck
                if (currentDeck.author !== answers.userName){
                    // prompt this:
                    console.log("You are not the owner of this deck. Would you like to make a copy of it?");
                } else {
                    deckLoadedInterface();
                }
            }
        }
    });
}

function deckLoadedInterface(){
    // prompt to view deck or add cards
}

function createDeckInterface(){
    // ask for card type
    // prompt user to start adding cards to the deck

}

function addNewCard(){
    var newCard = new BasicFlashcard(front, back);
    var newCard = new BasicFlashcard(text, startCloze, endCloze);
}
function viewDeck(){

}


