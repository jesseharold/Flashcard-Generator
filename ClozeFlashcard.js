function ClozeFlashcard(text, clozeStart, clozeEnd){
    this.text = text;
    this.clozeStart = parseInt(clozeStart);
    this.clozeEnd = parseInt(clozeEnd);
    
    this.getPartialText = function(){
        var partialText;
        partialText += this.text.substring(0, this.clozeStart);
        partialText += " [ ... ] ";
        partialText += this.text.substring(this.clozeEnd);
        return partialText;
    };
}

module.exports = ClozeFlashcard;