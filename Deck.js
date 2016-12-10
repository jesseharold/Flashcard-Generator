function Deck(name, author){
    this.name = name;
    this.author = author;
    this.cards = [];
    this.currentCard = 0;

    this.addCard = function(card){
        this.cards.push(card);
        this.saveDeck();
        return this.cards;
    };
    this.getCard = function(){
        return cards[currentCard];
    };
    this.nextCard = function(){
        currentCard++;
        if (currentCard === cards.length){
            currentCard = 0;
        }
        return cards[currentCard];
    };
    this.loadDeck = function(){
        fs.readFile(this.name + ".json", "utf-8", function(error, data){
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
        fs.writeFile(this.name + ".json", JSON.stringify(this.cards), function(error){
            if(error){
                console.log("There was an error saving the deck");
                return console.log(error);
            } else {
                console.log("Cards saved to the file " + this.name + ".json");
            }
        });
    };
    this.setCardType = function(type){
        this.cardType = type;
    };
}

module.exports = Deck;