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
            message: "What is the name of your deck? (do not use these characters: \" / \ . ? ')"
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
            if (!fs.existsSync("data/" + answers.deckName + "-" + answers.userName + ".json")){
                console.log("There is no deck by that name, try again.");
                startInterface();
            } else {
                currentDeck.loadDeck();
                deckLoadedInterface();
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
            message: "What would you like to do with " + currentDeck.name + "?",
            choices: ["Add new cards", "Use my cards to study"]
        }
    ]).then(function(response){
        if (response.nextAction === "Add new cards"){
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
    //console.log("Add a new card to " + currentDeck.name);
    if (currentDeck.cardType && currentDeck.cardType === "basic"){
        inquirer.prompt([
            {
                name: "front",
                message: "Enter the front of your new card:"
            }, {
                name: "back",
                message: "Enter the back of your new card:"
            }
        ]).then(function(card){
            var newCard = new BasicFlashcard(card.front, card.back);
            currentDeck.addCard(newCard);
            deckLoadedInterface();
        });
    } else if (currentDeck.cardType && currentDeck.cardType === "cloze"){
        inquirer.prompt([
            {
                name: "fulltext",
                message: "Enter the full, unhidden text of your new card:"
            }, {
                name: "clozeStart",
                message: "Where does the hidden text begin? Enter 0 for the first letter, 1 for the second letter, etc."
            }, {
                name: "clozeLength",
                message: "How many letters are in the text that should be hidden?"
            }
        ]).then(function(card){
            var endOfCloze = parseInt(card.clozeStart)+parseInt(card.clozeLength);
            var newCard = new ClozeFlashcard(card.fulltext, card.clozeStart, endOfCloze);
            currentDeck.addCard(newCard);
            deckLoadedInterface();
        });
    } else {
        console.log("Error: Card Type not set");
    }
}
function viewDeck(){
    //console.log("Study using " + currentDeck.name);
    var cardToShow = currentDeck.getCard();
    if (currentDeck.cardType && currentDeck.cardType === "basic"){
        displayAsCard(cardToShow.front);
        inquirer.prompt([
            {
                message: "(Enter) to show back of the card",
                name: "reveal"
            }
        ]).then(function(next){
            displayAsCard(cardToShow.back);
            askForNextCard();
        });
    } else if (currentDeck.cardType && currentDeck.cardType === "cloze"){
        displayAsCard(cardToShow.getPartialText());
        inquirer.prompt([
            {
                message: "(Enter) to show full text",
                name: "reveal"
            }
        ]).then(function(revealtext){
            displayAsCard(cardToShow.text);
            askForNextCard();
        });
    }    
}

function askForNextCard(){
    inquirer.prompt([
        {
            message: "(Enter) to show next card, (n) to exit.",
            name: "next"
        }
    ]).then(function(command){
        if (command.next !== "n"){
            currentDeck.nextCard();
            viewDeck();
        } else {
            deckLoadedInterface();
        }
    });
}

function displayAsCard(text){
    var border = " *******";
    for (var i = 0; i <= text.length; i++){
        border += "*";
    }
    console.log(" ");
    console.log(border);
    console.log(" *   " + text + "   *");
    console.log(border);
    console.log(" ");
}
