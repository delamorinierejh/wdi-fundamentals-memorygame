console.log("JS file is connected to HTML! Woo!");

/*var cardOne = "queen";
var cardTwo = "queen";
var cardThree = "king";
var cardFour = "king";*/

var gameBoard = document.getElementById('game-board');

var cardOptions = ['ace', 'king', 'queen', 'jack', 'ten', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two'];

var beginningCards = [];

//var beginningCards = ['queen', 'jack', 'king', 'jack', 'ace', 'king', 'ten', 'queen', 'ace', 'ten'];

var cards = [];

/*for (var i = 0; i < beginningCards.length; i++) {
  cards.push(beginningCards[i]);
}*/

var cardsInPlay = [];

var score = 0;


// this asks the player on page load how many pairs they want to play with
var determinePairs = function(){
  gameBoard.innerHTML = '';
  cards = [];
  beginningCards = [];
  var input = prompt("How many pairs do you want to find? Enter a number between 1 and 13");
  if (isNaN(input) || input < 1 || input > 13) {
    alert("Please enter a number between 1 and 13");
    determinePairs();
  } else {
    for (var i = 0; i < input; i++) {
      beginningCards.push(cardOptions[i]);
      beginningCards.push(cardOptions[i]);
    }
  }
  shuffle(beginningCards);
  createBoard();
};


// the below function shuffles the beginningCards array to make randomised games
var shuffle = function(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

var createBoard = function () {
  // reset the board
  gameBoard.innerHTML = '';
  cards = [];
  // reset the score
  score = 0;
  document.getElementById('score').innerHTML = 'Score: ' + score + '';  
  // add the cards to the board
  for (var i = 0; i < beginningCards.length; i++) {
      cards.push(beginningCards[i]);
    }
  for (var i = 0; i < cards.length; i++) {
    var newCard = document.createElement('div');
    newCard.className = "card";
    newCard.setAttribute('data-card', cards[i]);
    newCard.addEventListener('click', isTwoCards);
    gameBoard.appendChild(newCard);
  }
};

var updateBoard = function() {
    // setting the timeout so pairs diaply for a bit
    setTimeout(function(){
   // reset the board
    gameBoard.innerHTML = '';
    // update board with amended cards array
    for (var i = 0; i < cards.length; i++) {
      var newCard = document.createElement('div');
      newCard.className = "card";
      newCard.setAttribute('data-card', cards[i]);
      newCard.addEventListener('click', isTwoCards);
      gameBoard.appendChild(newCard);
    }
    }, 1000 );
};


var isMatch = function(array){
  (array[0] === array[1]) ?   confirmedMatch(array) :  noMatch(array); 
};

var noMatch = function(array) {
    //alert("Sorry, try again.");
      // clears innerHTML from all cards (turns them back over)
    for (var i = 0; i < cards.length; i++) {
    document.getElementsByClassName('card')[i].innerHTML = " ";
  }
};

var confirmedMatch = function(array) {
  // increase score by 1
  score ++;
  // alert about a match
  //alert("You found a match!");
  // display new score
  document.getElementById('score').innerHTML = 'Score: ' + score + '';
  // clear the used cards from cards array
 for (var i = 1; i <= 2; i++) {
    cards.splice(cards.indexOf(cardsInPlay[0]), 1);
  }
  cards.length === 0 ? alert("Well done! Click 'Reset the board' to play the same game again, or 'Choose your pairs again' to start a brand new game!") : updateBoard();
};

var isTwoCards = function() {

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

// back to top button functionality
var scrollTop = function() {
    window.scrollTo(0, 0);
};

determinePairs();

document.getElementById('reset').addEventListener('click', createBoard);

document.getElementById('restart').addEventListener('click', determinePairs);

document.getElementById('backToTop').addEventListener('click', scrollTop);





