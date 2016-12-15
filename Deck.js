var fs = require("fs");

function Deck(name, author){
    this.name = name;
    this.author = author;
    this.cards = [];
    this.currentCard = 0;

    this.addCard = function(card){
        //console.log("adding card");
        this.cards.push(card);
        this.saveDeck();
        return this.cards;
    };
    this.getCard = function(){
        //console.log("getting card");
        return this.cards[this.currentCard];
    };
    this.nextCard = function(){
        //console.log("advancing deck");
        this.currentCard++;
        if (this.currentCard === this.cards.length){
            this.currentCard = 0;
        }
        return this.cards[this.currentCard];
    };
    this.getPartialText = function(){
        var partialText = "";
        var card = this.cards[this.currentCard];
        if (card.clozeStart){
            partialText += card.text.substring(0, card.clozeStart);
            partialText += " [ ... ] ";
            partialText += card.text.substring(card.clozeEnd);
            return partialText;
        } else {
            console.log("cannot get partialText of a Basic card.");
        }
    };
    this.loadDeck = function(){
        var self = this;
        var fileName = "data/" + this.name + "-" + this.author + ".json";
        //console.log("loading deck from " + fileName);
        fs.readFile(fileName, "utf8", function(error, data){
            if(error){
                console.log("There was an error loading the deck.");
                return console.log(error);
            } else {
                self.cards = JSON.parse(data);
                //set deck type
                if(self.cards[0].front){
                    self.setCardType("basic");
                } else {
                    self.setCardType("cloze");
                }
            }
        });
    };
    this.saveDeck = function(){
        var self = this;
        var fileName = "data/" + this.name + "-" + this.author + ".json";
        fs.writeFile(fileName, JSON.stringify(this.cards), function(error){
            if(error){
                console.log("There was an error saving the deck");
                return console.log(error);
            } else {
                // console.log("Cards saved to file");
                if (fs.existsSync(fileName)){
                    return true;
                } else {
                    console.log("can't find file");
                }
            }
        });
    };
    this.setCardType = function(type){
        //console.log("deck type set to " + type);
        this.cardType = type;
    };
}

module.exports = Deck;