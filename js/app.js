/*
 * Create a list that holds all of your cards
 */

const cardsArray = Array.from(document.querySelectorAll('.deck li'));

// shuffling cards
function shuffleCards() {
  //const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(cardsArray);
  // apending shuffled cards to deck
  for (card of shuffledCards) {
    document.querySelector('.deck').appendChild(card);
  }

}
shuffleCards();

// move(s) and stars
let moves = 0;

function moveIncrement() {
  moves++;
  document.querySelector('.moves').innerHTML = moves;
  hideStar();

}

function hideStar() {
  const stars = document.querySelectorAll('.fa-star');
  if (moves === 10) {
    stars[0].style.display = 'none';
  } else if (moves === 16) {
    stars[0].style.display = 'none';
    stars[1].style.display = 'none';
  } else if (moves >= 20) {
    stars[0].style.display = 'none';
    stars[1].style.display = 'none';
    stars[2].style.display = 'none';
  }

}

// timer
let timer;
let time = 0;
let timerOff = true;

function startTimer() {
  timer = setInterval(() => {
    time++;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (seconds < 10) {
      document.querySelector('.timer').innerHTML = `${minutes}:0${seconds}`;
    } else {
      document.querySelector('.timer').innerHTML = `${minutes}:${seconds}`;
    }
  }, 1000);
}

// stop timer
function stopTimer() {
  clearInterval(timer);
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// get all cards
const deck = document.querySelector('.deck');

// flipping cards
// store flipped cards
let flippedCards = [];

function flipCard(targetCard) {
  targetCard.classList.toggle('open');
  targetCard.classList.toggle('show');
}

function addFlippedCard(flippedCard) {
  flippedCards.push(flippedCard);
}

deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
    flippedCards.length < 2 &&
    !flippedCards.includes(clickTarget)) {
    flipCard(clickTarget);
    addFlippedCard(clickTarget);

    if (flippedCards.length === 2) {
      matchCard();
      moveIncrement();
    }

    if (timerOff){
      startTimer();
      timerOff = false;
    }
  }

});

// checking match
function matchCard() {
  if (flippedCards[0].firstElementChild.className === flippedCards[1].firstElementChild.className) {
    flippedCards[0].classList.toggle('match');
    flippedCards[1].classList.toggle('match');
    flippedCards = [];
  } else {
    setTimeout(() => {
      flipCard(flippedCards[0]);
      flipCard(flippedCards[1]);
      flippedCards = [];
    }, 1000)

  }
}
