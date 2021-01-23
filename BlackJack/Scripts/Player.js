class Player {
    constructor(name,index) {
        this.name = name;
        this.index = index;
        this.hand = [];
        this.bust = false;
        this.points = 0;
        this.dealerScore = 0;
        this.hold = false;
        this.isDealer = false;        
    }
    addToHand(card) {
        this.hand.push(card);
        this.checkScore();
        if (this.getScore() > 21) {
            this.bust = true;
        }
    };
    clearHand() {
        this.hand = [];
    };
    checkScore() {
        if (this.getScore() > 21) {
            this.convertAce();
        }
    };
    convertAce() {
        for (let card of this.hand) {
            if (card.getValue() === 11) {
                card.value = 1;            }
        }
    };
    endRoundCheck() {
        this.checkScore();
        if (this.getScore() === 21 || this.hold) {
            return true;
        }
    };
    getBust() {
        return this.bust;
    };
    getHand() {
        return this.hand;
    };
    getScore() {
        let score = 0;
        for (let card of this.hand) {
            score += card.getValue();
        }
        return score;
    };
    hasAce() {
        for (let card in this.hand) {
            if (card.value === 11) {
                return true;
            }
        }
        return false;
    };
    hasBlackJack() {
        if (this.getScore() === 21 && this.hand.length === 2) {
            return true;
        }
        return false;
    };   
    hold() {
        this.stand = true;
    };
    
    
   
}