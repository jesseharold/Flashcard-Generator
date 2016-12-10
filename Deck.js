var fs = require("fs");

function Deck(name, author){
    this.name = name;
    this.author = author;
    this.cards = [{name:this.name,author:this.author}];
    this.currentCard = 0;

    this.addCard = function(card){
        console.log("adding card");
        this.cards.push(card);
        this.saveDeck();
        return this.cards;
    };
    this.getCard = function(){
        console.log("getting card");
        return cards[currentCard];
    };
    this.nextCard = function(){
        console.log("advancing deck");
        currentCard++;
        if (currentCard === cards.length){
            currentCard = 0;
        }
        return cards[currentCard];
    };
    this.loadDeck = function(){
        console.log("loading deck");
        fs.readFile("data/" + this.name + ".json", "utf-8", function(error, data){
            if(error){
                console.log("There was an error loading the deck.");
                return console.log(error);
            } else {
                this.cards = JSON.parse(data);
                console.log("Opened deck " + this.name + this.cards);
            }
        });
    };
    this.saveDeck = function(){
        var self = this;
        fs.writeFile("data/" + this.name + ".json", JSON.stringify(this.cards), function(error){
            if(error){
                console.log("There was an error saving the deck");
                return console.log(error);
            } else {
                console.log("Cards saved to the file " + self.name + ".json");
                if (fs.existsSync("data/" + self.name + ".json")){
                    console.log("Save success!");
                } else {
                    console.log("can't find file");
                }
            }
        });ha
    };
    this.setCardType = function(type){
        console.log("deck type set to " + type);
        this.cards[0].cardType = type;
    };
}

module.exports = Deck;