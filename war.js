
class Card{                                                                                             //This class defines the Game Card
    constructor(suit, name, value){
        this.name = name;
        this.suit = suit;
        this.value = value;
    }
}

class Deck{                                                                                              //This Class will define the deck of cards, and create a standard 52 card deck.
    constructor() {
        this.cards = [];
        this.suits = ['Spades', 'Diamonds', 'Clubs', 'Hearts'];
        this.names = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']
        this.values = [14, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
    }

   
    createDeck() {                                                                                       //This Method will create the deck of cards.
        console.log('Creating a Deck of Cards.');
        for (let i = 0; i < this.suits.length; i++) {                                                    //This first loop will iterate through the suits of the cards.
                // console.log(i, 'suit:', this.suits[i])                                                //This Console log is for debugging to make sure the for loop is working properly.
            for (let n = 0; n < this.names.length; n++) {                                                //This Nested Loop will iterate through the Names and Values of the cards.
                this.cards.push(new Card(this.suits[i], this.names[n], this.values[n]))                  //This will push the card objects to the empty cards array.
                // console.log(n, 'name', this.names[n]);                                                //This console log was to test that 
            }
        }
        console.log('Unshuffled Cards', this.cards);                                                   //This Console log is to verify that the output was a standard 52 card deck.
    };


    shuffleDeck() {                                                                                      //This Method will Shuffle the Deck of Cards
        console.log('Now Shuffling the Card Deck');
        const shuffledDeck = [];
        for (let i = 0; i < 52; i++) {                                                                   //This for loop was set to 52 iterations because we wanted to shuffle 52 cards
            let randomPosition = Math.floor((this.cards.length - i) * Math.random());                    //This will take the last item of the array and multiply it by a random number and assign it to randomPosition
            let randomItem = this.cards.splice(randomPosition, 1);                                       //This will set the randomItem variable to the spliced object based on the random calculation from above.
            shuffledDeck.push(...randomItem);                                                               //This will push the random object from above into a new empty array called shuffledDeck
        }
        // console.log('Shuffle', shuffledDeck);                                                            //This Console log tested the functionality of the method.
        // console.log('this.cards', this.cards);                                                                         //This Console log tested the output of the this.cards array after shuffling.
        // console.log('Specific Card', shuffledDeck[30][0].suit);                                          //This Console log was to test that the suit of a specific card matched the card before shuffling.
        return shuffledDeck;        
    }
    dealDeck(players, shuffledCards) {                                                                   //This Method Will Deal the Cards to the players.
        console.log('Now Dealing Cards to Players');
        let dealingCards1 = shuffledCards.splice(0, 26);
        players[0].hands.push(...dealingCards1);                                                            //This is pushing the first half of the shuffled cards to Player 1
        console.log('dealing1', dealingCards1);                                                             //this will splice the first 26 cards of the shuffled deck and assign that array to the declared variable
        let dealingCards2 = shuffledCards.splice(0, 26);                                                 //This will splice the last 26 cards of the shuffled deck and assign at array to the declared variable
        players[1].hands.push(...dealingCards2);                                                            //This is pushing the last half of the shuffled cards to Player 2
        console.log('dealing2', dealingCards2);
        console.log(players[0]);                                                                            //Console log used to test functionality
    }
}

class Players {                                                                                           //This Class will now create the players for the game.
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.hands = [];
    }
}

class Game{
    constructor(){
        this.players = [];
    }

    start() {                                                                                              //This method will start the game.
       
        //Create Deck and shuffle cards
        let myDeck = new Deck();
        myDeck.createDeck();
        let shuffledDeck = myDeck.shuffleDeck();

        //Create Players and assign them names.
        this.players.push(new Players('Cloud'));
        this.players.push(new Players('Sephiroth'));
        console.log('Meet the Contenders!!!!', this.players);                                               
        
        //Deal Cards to Players
        myDeck.dealDeck(this.players, shuffledDeck);
        console.log(this.players);                                                                       

        //Play Game Method (This is the Actual Game Play. Should run until one player is out of cards.)
        this.playGame();

        //Determine Outcome of Game and output game results.
        this.endGame();
    }

    playGame() {                                                                                          //This Method is where the game is played.
        console.log('The Game of WAR has Commenced!!');
        let player1 = this.players[0];
        let player2 = this.players[1];
        console.log('taking turns', player1, player2)
        let roundWinner = '';
        let turn = 0;
        for (let i = 0; i < 50; i++){ //This loop will make the game last a set amount of turns
        //while (player1.hands.length !== 0 && player2.hands.length !== 0) {                 //This While Loop will run until one player is out of cards.
            let player1Card = player1.hands.pop();                                           //should pop last card from the hands array
            console.log('Player1 Card', player1Card.value, player1Card.suit);
            console.log(this.players);
            let player2Card = player2.hands.pop();
            console.log('Player2 Card', player2Card.value, player2Card.suit);
            if (player1Card.value > player2Card.value) {                                       //If Player 1 has a better card, Player 1 Gets point, and both play cards
                roundWinner = player1.name;
                player1.hands.unshift(player1Card);
                player1.hands.unshift(player2Card);
                player1.points += 1;
                console.log('Turn: ', (turn += 1), '\nPlayer 1 card: ', player1Card.suit, player1Card.value, ',\nPlayer 2 card: ', player2Card.suit, player2Card.value, "\nRound Winner: ", roundWinner, '\nPlayer 1 Points: ', player1.points, '\nPlayer 2 Points: ', player2.points, '.');
            }
            else if (player2Card.value > player1Card.value) {                                   //If Player 2 has a better card, Player 2 Gets point, and both play cards. 
                roundWinner = player2.name;
                player2.hands.unshift(player1Card);
                player2.hands.unshift(player2Card);
                player2.points += 1;
                console.log('Turn: ' + (turn += 1) + '\nPlayer 1 card: ' + player1Card + ',\nPlayer 2 card: ' + player2Card + "\nRound Winner: " + roundWinner + '\nPlayer 1 Points: ' + player1.points + '\nPlayer 2 Points: ' + player2.points + '.');
            }
             else {                                                                             //If Both players play a card of the same value, each player will get their card back, and no points awarded.
                player1.hands.unshift(player1Card);
                player2.hands.unshift(player2Card);
                console.log('Turn: ' + (turn += 1) + '\nPlayer 1 card: ' + player1Card + ',\nPlayer 2 card: ' + player2Card + "\nTIED MATCH, NO WINNER " + '\nPlayer 1 Points: ' + player1.points + '\nPlayer 2 Points: ' + player2.points + '.');
             }
        }
    }

    endGame() {                                                                                         //This Method will run when the game is over and announce the winner!
        let gameWinner = '';
        let player1 = this.players[0];
        let player2 = this.players[1];
        let winnerPoints = 0;

        if (player1.points > player2.points) {
            gameWinner = player1;
            winnerPoints = player1;
        } else if (player2.points > player1.points) {
            gameWinner = player2
            winnerPoints = player2;
        } 
        console.log('GAME OVER! ' + gameWinner + " Won the game!\nFINAL SCORES:\n" + player1.name + ": " + player1.points + "\n" + player2.name + ': ' + player2.points + "\nThank you for Playing!");
    } 
}

let game = new Game();
game.start();
