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
            choices: ["Add new cards", "Use my cards to study", "I'm done with this deck."]
        }
    ]).then(function(response){
        if (response.nextAction === "Add new cards"){
            addNewCardInterface();
        } else if (response.nextAction === "Use my cards to study") {
            viewDeckInterface();
        } else {
            startInterface();
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
        addNewCardInterface();
    });
}

function addNewCardInterface(saveIndex){
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
            if (typeof saveIndex !== "undefined"){
                currentDeck.saveCard(newCard, saveIndex);
            } else {
                currentDeck.addCard(newCard);
            }
            deckLoadedInterface();
        });
    } else if (currentDeck.cardType && currentDeck.cardType === "cloze"){
        inquirer.prompt([
            {
                name: "fulltext",
                message: "Enter the full, unhidden text of your new card:"
            }
         ]).then(function(input){      
            // create a string that shows the indexes of the characters
            // to make it easier to say where to hide text      
            var textWithNumbers = "";
            for (var i = 0; i < input.fulltext.length; i++){
                textWithNumbers += i + input.fulltext.charAt(i);
            }
            textWithNumbers += input.fulltext.length;
            inquirer.prompt([
                {
                    name: "clozeStart",
                    message: textWithNumbers + "\nWhere would you like the hidden text to begin? (Enter number)"
                }, {
                    name: "clozeEnd",
                    message: "Where would you like the hidden text to end? (Enter number)"
                }
            ]).then(function(card){
                var newCard = new ClozeFlashcard(input.fulltext, card.clozeStart, card.clozeEnd);
                if (typeof saveIndex !== "undefined"){
                    // if there is an argument passed to addNewCardInterface
                    // this should be saved over an existing card
                    currentDeck.saveCard(newCard, saveIndex);
                } else {
                    currentDeck.addCard(newCard);
                }
                //back to main deck menu
                deckLoadedInterface();
            });
        });   
    } else {
        console.log("Error: Card Type not set");
    }
}
function viewDeckInterface(){
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
        displayAsCard(currentDeck.getPartialText());
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
            message: "(Enter) to show next card, (x) to exit, (d) to edit this card.",
            name: "next"
        }
    ]).then(function(command){
        if (command.next === "d" ){
            addNewCardInterface(currentDeck.currentCard);
        } else if (command.next === "x") {
            deckLoadedInterface();
        } else {
            currentDeck.nextCard();
            viewDeckInterface();
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
