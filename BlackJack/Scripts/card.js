class Card {
    constructor(suit, label) {
        this.suit = suit;
        this.label = label;
        this.value = this.setValue(label);
        this.showFace = true;
        this.backUrl = "../Content/cardFaces/Red_back.jpg";
        this.frontUrl = `../Content/cardFaces/${this.label}${this.suit}.jpg`;
    };
    getValue() {
        return this.value;
    };
    setValue(label) {
        if (!Number.isNaN(Number(label))) {
            return Number(label);
        } else if (label == 'A') {
            return 11;

        }
        return 10;
    };
    showFace() {
        this.showFace = true;
    };

}
