var ClozeFlashcard = require("./ClozeFlashcard");
var BasicFlashcard = require("./BasicFlashcard");
var Deck = require("./Deck");
var inquirer = require("inquirer");
var fs = require("fs");
var currentDeck;

startInterface();

function startInterface(){
    // user selects create new deck or retrieve existing deck
    inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "Welcome to Flash Cards. What would you like to do?",
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
            //console.log("Checking for deck " + answers.deckName);
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
    inquirer.prompt([
        {
            name: "nextAction",
            type: "list",
            message: "What would you like to do with your deck, " + currentDeck.name + "?",
            choices: ["Add new cards", "Study using my flash cards"]
        }
    ]).then(function(response){
        if (response.cardType === "Add new cards"){
            addNewCard();
        } else {
            viewDeck();
        }
    });
}

function createDeckInterface(){
    // ask for card type
    inquirer.prompt([
        {
            name: "cardType",
            type: "list",
            message: "What type of cards do you want in your deck?",
            choices: ["Traditional front-and-back flash cards", "Fill-in-the-blank style flash cards"]
        }
    ]).then(function(response){
        if (response.cardType === "Traditional front-and-back flash cards"){
            currentDeck.setCardType("basic");
        } else {
            currentDeck.setCardType("cloze");
        }
        // prompt user to start adding cards to the deck
        addNewCard();
    });
}

function addNewCard(){
    console.log("Add a new card to " + currentDeck.name);
    //var newCard = new BasicFlashcard(front, back);
    //var newCard = new BasicFlashcard(text, startCloze, endCloze);
}
function viewDeck(){
    console.log("Study using " + currentDeck.name);
}


