class Game {
    constructor() {
        this.numOfDecks = 2;
        this.mainDeck = new Deck(this.numOfDecks);
        this.players = [];
        this.currPlayer;
        this.dealer = new Player("dealer");
        this.round = 1;
        this.gameOver = false;
        this.initilizeGame();
        this.startRound();

    }
    displayPlayerName() {
        $('.PlayerName').text(this.currPlayer.name);
    }
    displayHand(player) {
        let boardSection = '';
        if (player.isDealer) {
            boardSection = "dealerRow";
        } else {
            boardSection = "playerRow";
        }
        $(`.${boardSection}`).empty();
        for (let card of player.hand) {
            let cardUrl = card.backUrl;
            if (card.showFace === true) {
                cardUrl = card.frontUrl;
            }
            let newCard = `
                        <div class="col-3">
                                <img class="card-img-top img-responsive" src="${cardUrl}" alt="Card image cap">
                            </div>

                           `
            $(`.${boardSection}`).append(newCard);
        }

    }
    displayScores() {
        const { players } = this;
        $('.scoreDisplay').empty();
        for (let player of players) {
            if (!player.isDealer) {
                let newScore = `
                        <div class="row text-white  text-center">
                            <div class="col-12">
                                <h4>${player.name}</h4>
                            </div>
                        </div>

                        <div class="row text-white text-center">
                            <div class="col-6 ">
                                <h3>${player.points}</h3>

                            </div>
                            <div class="col-6 ">
                                <h3>${player.dealerScore}</h3>
                            </div>
                        </div>
                            `;
                $('.scoreDisplay').append(newScore);
            }
            
        }
    }    
    checkDeckSize() {
        if (this.mainDeck.Lenght <= this.mainDeck.numOfCard * .25) {
            this.newDeck();
        }

    }
    checkEndTurn() {
        this.currPlayer.checkScore();
        if (this.currPlayer.getScore() >= 21) {
            $('.btn').prop('disabled', true);
            var self = this;
            setTimeout(function () {
                $('.btn').prop('disabled', false);

                self.loadNextPlayer();
            }, 3000);

        }


    }
    checkForWinners() {
        const { dealer } = this;
        let dealerScore = dealer.getScore();
        let dealerBust = dealer.getBust();
        let dealerHasBlackJack = dealer.hasBlackJack();
        for (let player of this.players) {
            if (!player.isDealer) {
                if (player.hasBlackJack() && dealerHasBlackJack) {
                    player.points++;
                    player.dealerScore++;
                } else if (player.hasBlackJack() && !dealerHasBlackJack) {
                    player.points += 2;

                } else if (!player.hasBlackJack() && dealerHasBlackJack) {
                    player.dealerScore += 2;
                } else if (!player.hasBlackJack() && !dealerHasBlackJack) {
                    let playerScore = player.getScore();

                    if (player.getBust() || (!dealerBust && dealerScore >= playerScore)) {
                        player.dealerScore++;
                    } else {
                        player.points++;
                    }                  
                }
            }

        }
        this.round++;
       
        $(".next").show();
        this.displayScores();    }
    checkGameOver() {
        if (this.players.lenght = 0) {
            this.gameOver = true;
        }
    }
    checkDealerEndTurn() {
        let bestPlayerScore = this.getBestPlayerScore();
        this.dealer.checkScore();
        const { dealer } = this;
        let dealerScore = dealer.getScore();
        if (bestPlayerScore === 0 || dealer.hasBlackJack() || dealerScore >= bestPlayerScore || dealerScore >= 21) {
            return true;
        }
        else {
            if (dealerScore < 17 || (dealer.hasAce() && dealerScore < 18) || dealerScore < bestPlayerScore) {
                this.dealer.addToHand(this.mainDeck.drawCard());
                this.displayHand(this.dealer);
               
            }
        }
        return false;
    }
    clearPlayersHand() {
        for (let player of this.players) {
            player.clearHand();
        }
    }   
    getBestPlayerScore() {
        let score = 0;
        for (let player of this.players) {
            let playerScore = player.getScore();
            if (playerScore > score && playerScore <= 21) {
                score = playerScore;
            }
        }
        return score;
    }
    initilizeGame() {
        this.initilizePlayers(1);
        this.mainDeck.shuffleDeck();
        $(".hit").show();
        $(".hold").show();
    }
    initilizePlayers(playersCount) {
        for (let index = 0; index < playersCount; index++) {
            this.players.push(new Player(`Player ${index+1}`, index));
        }
        this.dealer.isDealer = true;
        this.players.push(this.dealer);
        this.dealer.index = this.players.length + 1;
    };
    loadDealerTurn() {
        $('.playerBtn').prop('disabled', true);
        this.dealer.hand[0].showFace = true;
        this.displayHand(this.dealer);

        let endTurn = false;
        while (!endTurn) {
            endTurn = this.checkDealerEndTurn();

        }
        this.checkForWinners();

    }
    loadHit() {
        this.currPlayer.addToHand(this.mainDeck.drawCard());
        this.displayHand(this.currPlayer);
        this.checkEndTurn();
    }
    loadHold() {
        this.loadNextPlayer();
    }
    loadNextPlayer() {
        const { currPlayer, players } = this;
        if (players[currPlayer.index + 1].isDealer != true) {          
            this.currPlayer = players[currPlayer.index + 1];        
            this.displayHand(this.currPlayer);
            this.displayPlayerName();
            this.checkEndTurn();



        } else {
             
            this.loadDealerTurn();
            
            
        }

    }   
    newDeck() {
        this.mainDeck = new Deck(this.numOfDecks);
    }  
    startRound() {
        this.clearPlayersHand();
        $('.playerBtn').prop('disabled', false);
        $(".next").hide();

        for (let index = 0; index < 2; index++) {
            for (let player of this.players) {
                player.addToHand(this.mainDeck.drawCard());
                player.bust = false;
            }
        }
        this.dealer.hand[0].showFace = false;

        this.displayHand(this.dealer);
        this.currPlayer = this.players[0];
        this.displayPlayerName();
        this.displayHand(this.currPlayer);
        this.checkEndTurn();
        $('.roundDisplay').text(this.round);

    };

}