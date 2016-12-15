function ClozeFlashcard(text, clozeStart, clozeEnd){
    this.text = text;
    this.clozeStart = parseInt(clozeStart);
    this.clozeEnd = parseInt(clozeEnd);
}

module.exports = ClozeFlashcard;