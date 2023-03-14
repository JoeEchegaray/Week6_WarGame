
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
            for (let n = 0; n < this.names.length; n++) {                                                //This Nested Loop will iterate through the Names and Values of the cards.
                this.cards.push(new Card(this.suits[i], this.names[n], this.values[n]))                  //This will push the card objects to the empty cards array.
            }
        }
        //console.log('Unshuffled Cards', this.cards);                                                   //This Console log is to verify that the output was a standard 52 card deck.
    };

    shuffleDeck() {                                                                                      //This Method will Shuffle the Deck of Cards
        console.log('Now Shuffling the Card Deck');
        const shuffledDeck = [];
        for (let i = 0; i < 52; i++) {                                                                   //This for loop was set to 52 iterations because we wanted to shuffle 52 cards
            let randomPosition = Math.floor((this.cards.length - i) * Math.random());                    //This will take the last item of the array and multiply it by a random number and assign it to randomPosition
            let randomItem = this.cards.splice(randomPosition, 1);                                       //This will set the randomItem variable to the spliced object based on the random calculation from above.
            shuffledDeck.push(...randomItem);                                                               //This will push the random object from above into a new empty array called shuffledDeck
        }
        return shuffledDeck;        
    }

    dealDeck(players, shuffledCards) {                                                                   //This Method Will Deal the Cards to the players.
        console.log('Now Dealing Cards to Players');
        let dealingCards1 = shuffledCards.splice(0, 26);
        players[0].hands.push(...dealingCards1);                                                            //This is pushing the first half of the shuffled cards to Player 1
        let dealingCards2 = shuffledCards.splice(0, 26);                                                    //This will splice the last 26 cards of the shuffled deck and assign at array to the declared variable
        players[1].hands.push(...dealingCards2);                                                            //This is pushing the last half of the shuffled cards to Player 2                                            
    }
}

class Players {                                                       //This Class will now create the players for the game.
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

    start() {                                                         //This method will start the game.
        //Create Players and assign them names.
        this.players.push(new Players('Cloud'));
        this.players.push(new Players('Sephiroth'));
        console.log('Meet the Contenders!!!!', this.players);

        //Create Deck and shuffle cards
        let myDeck = new Deck();
        myDeck.createDeck();
        let shuffledDeck = myDeck.shuffleDeck();

        //Deal Cards to Players
        myDeck.dealDeck(this.players, shuffledDeck);
        //console.log(this.players);                                                                       

        //Play Game Method (This is the Actual Game Play. Should run until one player is out of cards.)
        this.playGame();

        //Determine Outcome of Game and output game results.
        this.endGame();
    }

    playGame() {                                                     //This Method is where the game is played.
        console.log('The Game of WAR has Commenced!!');
        let player1 = this.players[0];
        let player2 = this.players[1];
        // console.log('taking turns', player1, player2)
        let roundWinner = '';
        let turn = 0;
        //This Loop will run until one player runs out of cards, Each iteration will pop the last card from each players array of cards and compare the values of the cards and determine who gets the point for the round, and console log out the results of each round..
        while (player1.hands.length !== 0 && player2.hands.length !== 0) {                    
            let player1Card = player1.hands.pop();                                            
            let player2Card = player2.hands.pop();
            if (player1Card.value > player2Card.value) {                                       
                roundWinner = player1.name;
                //player1.hands.unshift(player1Card); //Uncomment for a never ending game of War
                //player1.hands.unshift(player2Card); //Uncomment for a never ending game of War
                player1.points += 1;
                console.log('Turn: ', (turn += 1), '\nPlayer 1 card: ', player1Card.name, ' of ', player1Card.suit, '\nPlayer 2 card: ', player2Card.name, ' of ', player2Card.suit, "\nRound Winner: ", roundWinner, '\nPlayer 1 Points: ', player1.points, '\nPlayer 2 Points: ', player2.points, '.');
            }
            else if (player2Card.value > player1Card.value) {                                    
                roundWinner = player2.name;
                //player2.hands.unshift(player1Card); //Uncomment for a never ending game of War
                //player2.hands.unshift(player2Card); //Uncomment for a never ending game of War
                player2.points += 1;
                console.log('Turn: ', (turn += 1), '\nPlayer 1 card: ', player1Card.name, ' of ', player1Card.suit, '\nPlayer 2 card: ', player2Card.name, ' of ', player2Card.suit, "\nRound Winner: ", roundWinner, '\nPlayer 1 Points: ', player1.points, '\nPlayer 2 Points: ', player2.points, '.');
            }
             else {                                                                             
                //player1.hands.unshift(player1Card); //Uncomment for a never ending game of War
                //player2.hands.unshift(player2Card); //Uncomment for a never ending game of War
                console.log('Turn: ', (turn += 1), '\nPlayer 1 card: ', player1Card.name, ' of ', player1Card.suit, '\nPlayer 2 card: ', player2Card.name, ' of ', player2Card.suit, "\nTIED MATCH, NO WINNER ", '\nPlayer 1 Points: ', player1.points, '\nPlayer 2 Points: ', player2.points, '.');
             }
        }
    }

    endGame() {                                                      //This Method will run when the game is over and announce the winner!
        let gameWinner = '';
        let player1 = this.players[0];
        let player2 = this.players[1];
        let winnerPoints = 0;

        //This will compare the points for each player and determine who won the game and console log out the winner of the game.
        if (player1.points > player2.points) {
            gameWinner = player1.name;
            winnerPoints = player1.points;
            alert('GAME OVER! ' + gameWinner + " Won the game!\nFINAL SCORES:\n" + player1.name + ": " + player1.points + "\n" + player2.name + ': ' + player2.points + "\nThank you for Playing!");
        } else if (player2.points > player1.points) {
            gameWinner = player2.name;
            winnerPoints = player2.points;
            alert('GAME OVER! ' + gameWinner + " Won the game!\nFINAL SCORES:\n" + player1.name + ": " + player1.points + "\n" + player2.name + ': ' + player2.points + "\nThank you for Playing!");
        } else {
            alert('GAME OVER! \nTIED GAME\nFINAL SCORES:\n' + player1.name + ": " + player1.points + "\n" + player2.name + ': ' + player2.points + "\nThank you for Playing!");
        }
    } 
}

let game = new Game();
game.start();
