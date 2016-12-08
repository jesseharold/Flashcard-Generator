var ClozeFlashcard = require("./ClozeFlashcard");
var BasicFlashcard = require("./BasicFlashcard");

var newClozeCard = new ClozeFlashcard("Mama Jo is your mama.", 0, 7);
var newBasicCard = new BasicFlashcard("Who is your mama?", "Mama Jo");

console.log(newBasicCard.front);
console.log(newBasicCard.back);
console.log(newClozeCard.getPartialText());