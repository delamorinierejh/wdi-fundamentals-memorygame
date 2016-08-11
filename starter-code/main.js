console.log("JS file is connected to HTML! Woo!");

/*var cardOne = "queen";
var cardTwo = "queen";
var cardThree = "king";
var cardFour = "king";*/

var gameBoard = document.getElementById('game-board'),

cardOptions = ['ace', 'king', 'queen', 'jack', 'ten', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two'],

beginningCards = [],

//var beginningCards = ['queen', 'jack', 'king', 'jack', 'ace', 'king', 'ten', 'queen', 'ace', 'ten'];

cards = [],

/*for (var i = 0; i < beginningCards.length; i++) {
  cards.push(beginningCards[i]);
}*/

cardsInPlay = [],

attempts = 0,

score = 0,

//var updateCount = 0;

cardSizeGroup;

// this asks the player on page load how many pairs they want to play with
function determinePairs(){
  gameBoard.innerHTML = '';
  cards = [];
  beginningCards = [];
  var input = prompt("How many pairs do you want to find? Enter a number between 1 and 9");
  if (isNaN(input) || input < 1 || input > 9) {
    alert("Please enter a number between 1 and 9");
    determinePairs();
  } else {
      for (var i = 0; i < input; i++) {
      beginningCards.push(cardOptions[i]);
      beginningCards.push(cardOptions[i]);
    }
  }
  shuffle(beginningCards);
  // BROKEN AND COMMENTED OUT - size of the cards will adjust depending on how many pairs are chosen.
  /*if (beginningCards.length % 16 === 0 || beginningCards.length % 24 === 0){
    var document.getElementsByClassName('card').className = "card";
    document.getElementsByClassName('card2').className = "card";
  }
  else if (beginningCards.length % 6 === 0){
    document.getElementsByClassName('card').className = "card2";
    document.getElementsByClassName('card2').className = "card2";
  }*/
  createBoard();
}


// the below function shuffles the beginningCards array to make randomised games
shuffle = function(array) {
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
}

function createBoard() {
  updateCount = 0;
  // reset the board
  gameBoard.innerHTML = '';
  cards = [];
  // reset the attempts
  attempts = 0;
  document.getElementById('attempts').innerHTML = 'Attempts: ' + attempts + '';
  // reset the score
  score = 0;
  document.getElementById('score').innerHTML = 'Score: ' + score + '';  
  // add the cards to the board
  for (var i = 0; i < beginningCards.length; i++) {
      cards.push(beginningCards[i]);
    }

  for (var i = 0; i < cards.length; i++) {
    var newCard = document.createElement('div');
     // adjust size of the cards depending on the number of cards 
    if (cards.length === 6) {
      newCard.className = "card2";
      cardSizeGroup = 2;
    } else if (cards.length === 8) {
      newCard.className = "card1";
      cardSizeGroup = 1;
    } else if (cards.length === 18) {
      newCard.className = "card2";
      cardSizeGroup = 2;
    } else if (cards.length === 14) {
      newCard.className = "card4";
      cardSizeGroup = 4;
    } else if (cards.length > 15) {
      newCard.className = "card1";
      cardSizeGroup = 1;
    } else if (cards.length > 10) {
      newCard.className = "card2";
      cardSizeGroup = 2;
    } else {
      newCard.className = "card3";
      cardSizeGroup = 3;
    }
    newCard.setAttribute('data-card', cards[i]);
    newCard.addEventListener('click', isTwoCards);
    gameBoard.appendChild(newCard);
  }
}

function updateBoard() {
    // increase count of updates
    //updateCount ++;
    // setting the timeout so pairs display for a bit
    setTimeout(function(){
   // reset the board
    gameBoard.innerHTML = '';
    // update board with amended cards array
    for (var i = 0; i < cards.length; i++) {
      var newCard = document.createElement('div');
      if (beginningCards.length === 6) {
      newCard.className = "card2";
      } else if (beginningCards.length === 8) {
      newCard.className = "card1";
      } else if (beginningCards.length === 14) {
      newCard.className = "card4";
      } else if (beginningCards.length === 18) {
      newCard.className = "card2";
      } else if (beginningCards.length > 15) {
      newCard.className = "card1";
      } else if (beginningCards.length > 10) {
      newCard.className = "card2";
      } else {
      newCard.className = "card3";
      }
      newCard.setAttribute('data-card', cards[i]);
      newCard.addEventListener('click', isTwoCards);
      gameBoard.appendChild(newCard);
    }
    }, 1000 );
}

function isMatch(array){
  (array[0] === array[1]) ?   confirmedMatch(array) :  noMatch(array); 
}

function noMatch(array) {
    //alert("Sorry, try again.");
      // clears innerHTML from all cards (turns them back over)
    for (var i = 0; i < cards.length; i++) {
    document.getElementsByClassName('card' + cardSizeGroup)[i].innerHTML = " ";
  }
}

function confirmedMatch(array) {
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


 // alert when game has been finished
  cards.length === 0 ? 
    score === attempts ? 
    alert("Wow! Perfect Game! Click 'Reset' to play the same game again, or start a 'New Game'!") :
    alert("Well done! Click 'Reset' to play the same game again, or start a 'New Game'!") : 
    updateBoard();
}


function isTwoCards() {

  // add card to array of cards in play
  // 'this' hasn't been covered in this prework, but
  // for now, just know it gives you access to the card the user clicked on
  cardsInPlay.push(this.getAttribute('data-card'));

  // turn cards over
  this.innerHTML = '<img class="img' + cardSizeGroup + '" src="card-images/' + this.getAttribute('data-card') + '.png" alt = "' + this.getAttribute('data-card') + '"/>';

  // if you have two cards in play check for a match
  if (cardsInPlay.length === 2) {

    // increase the attempts by 1
    attempts++;

    // display new attempts number
    document.getElementById('attempts').innerHTML = 'Attempts: ' + attempts + '';

    // pass the cardsInPlay as an argument to isMatch function
    isMatch(cardsInPlay);

    // clear cards in play array for next try
    cardsInPlay = [];

  }

}

// back to top button functionality
function scrollTop() {
    window.scrollTo(0, 0);
};

//determinePairs();

// set up click event listeners on bottom buttons 

document.getElementById('reset').addEventListener('click', createBoard);

document.getElementById('newGame').addEventListener('click', determinePairs);

document.getElementById('backToTop').addEventListener('click', scrollTop);

