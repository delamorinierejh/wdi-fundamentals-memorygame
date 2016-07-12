console.log("JS file is connected to HTML! Woo!");

/*var cardOne = "queen";
var cardTwo = "queen";
var cardThree = "king";
var cardFour = "king";*/

var gameBoard = document.getElementById('game-board');

var cards = ['queen', 'king', 'king', 'queen'];

var cardsInPlay = [];

var createBoard = function () {
  for (var i = 0; i < cards.length; i++) {
    var newCard = document.createElement('div');
    newCard.className = "card";
    newCard.setAttribute('data-card', cards[i]);
    newCard.addEventListener('click', isTwoCards);
    gameBoard.appendChild(newCard);
  }
};


var isMatch = function(array){
	(array[0] === array[1]) ?   alert("You found a match!") :  alert("Sorry, try again.");
      // clears innerHTML from all cards (turns them back over)
    for (var i = 0; i < cards.length; i++) {
    document.getElementsByClassName('card')[i].innerHTML = " ";
  }
};

function isTwoCards() {

  // add card to array of cards in play
  // 'this' hasn't been covered in this prework, but
  // for now, just know it gives you access to the card the user clicked on
  cardsInPlay.push(this.getAttribute('data-card'));

  this.innerHTML = '<img src="root/' + this.getAttribute('data-card') + '.png">';

  // if you have two cards in play check for a match
  if (cardsInPlay.length === 2) {

    // pass the cardsInPlay as an argument to isMatch function
    isMatch(cardsInPlay);

    // clear cards in play array for next try
    cardsInPlay = [];

  }


};

createBoard(cards.length);

