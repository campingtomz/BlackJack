
class Deck {
   
    constructor(numOfDecks) {
        
        this.deck = [];
        this.numOfCard = 0;
        this.initilizeDeck(numOfDecks);
    };
    initilizeDeck(numOfDecks) {
        let suits = ['H', 'D', 'S', 'C'];
        let labels = '2,3,4,5,6,7,8,9,10,J,Q,K,A';
        const { deck } = this;
        for (let index = 0; index < numOfDecks; index++) {
            suits.forEach(function (suit) {
                for (let label of labels.split(',')) {                   
                    deck.push(
                        new Card(suit, label)
                    );
                };
            });
        }
        this.setNumOfCards();
    };
   
    drawCard() {
        return this.deck.pop();
    };
    setNumOfCards() {
        this.numOfCards = this.deck.Length;
    };
    shuffleDeck() {
        const { deck } = this;
        for (let shuffleCount = 0; shuffleCount < 10; shuffleCount++) {
            for (let index = deck.length - 1; index > 0; index--) {
                let randIndex = Math.floor(Math.random() * index);
                let temp = deck[index];
                deck[index] = deck[randIndex];
                deck[randIndex] = temp;
            }
        }
    };
}
