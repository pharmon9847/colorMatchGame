//* Set game variables
// the game container is set to the DOM element game
const gameBoard = document.getElementById('game');
// set card1 variable to a value of null
let card1 = null;
// set card2 variable to a value of null
let card2 = null;
// set cardsFlipped variable to zero
let flippedCards = 0;
// create boolean noClicking and set it to false
let notClicking = false;

// * create the colors for the match game
// create an array of colors for the cards of the game
const COLORS = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'grey',
  'fuchsia',
  'chocolate',
  'teal',
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'grey',
  'fuchsia',
  'chocolate',
  'teal',
];

// * create function that will randomly shuffle cards for each game
// create a function called shuffle which will shuffle the cards for each game
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// * create function that will create the cards
// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement('div');
    newDiv.classList.add(color);
    newDiv.addEventListener('click', handleCardClick);
    gameBoard.append(newDiv);
  }
}

// * create function that handles the click of each individual card
// create function for each card click
// there are two options: clicking on card -or- flipped (not clicking on card)
function handleCardClick(e) {
  // this condition looks for if there is not a card click
  if (notClicking) return;
  // this condition looks for if a card has been flipped
  if (e.target.classList.contains('flipped')) return;

  // create a variable for the current card and set it equal to the event target
  // this lets you apply logic to the current target of the event listener
  let currentCard = e.target;
  // set the background color of the current card to the color that it holds
  currentCard.style.backgroundColor = currentCard.classList[0];

  // create condition that if not card1 and not card2
  if (!card1 || !card2) {
    // add the class flipped
    currentCard.classList.add('flipped');
    // card1 is card1 and is the current card
    card1 = card1 || currentCard;
    // ternary that says card2 is set to either:
    // if current card is equal to card1 then the value is null
    // if current card is not equal to card1 then the value is currentCard
    card2 = currentCard === card1 ? null : currentCard;
  }

  // create condition that checks card1 and card2
  if (card1 && card2) {
    // set variable noClicking to true
    notClicking = true;
    // create varialbe gif1 and make that equal to card1's class name
    let gif1 = card1.className;
    // create variable gif2 and make that equal to card2's class name
    let gif2 = card2.className;

    // create condition for gif1 being equal to gif2
    if (gif1 === gif2) {
      // increase the count in the cardsFlipped variable by 2
      flippedCards += 2;
      // execute the removeEventListener method on card1 which will stop listening for click event
      card1.removeEventListener('click', handleCardClick);
      // execute the removeEventListener method on card2 which will stop listening for click event
      card2.removeEventListener('click', handleCardClick);
      // set value of card1 to null
      card1 = null;
      // set value of card2 to null
      card2 = null;
      // set value of noClicking to false
      notClicking = false;
      // if gif1 does not equal gif2
    } else {
      // create a timeout function
      setTimeout(function () {
        // change the background color of card1 to an empty string, which will appear blank
        card1.style.backgroundColor = '';
        // change the background color of card2 to an empty string, which will appear blank
        card2.style.backgroundColor = '';
        // remove the class of flipped from card1
        card1.classList.remove('flipped');
        // remove the class of flipped from card2
        card2.classList.remove('flipped');
        // set the value of card1 to null
        card1 = null;
        // set the value of card2 to null
        card2 = null;
        // set the value of noClicking to false
        notClicking = false;
        // set the timeout value to 1000 milliseconds, or 1 second
      }, 1000);
    }
  }
  // create condition that says if all the cards have been flipped, create alert which says 'game over'
  if (flippedCards === COLORS.length)
    alert('Congratulations! You got them all!');
}

// call the function createDivsForColors and pass in shuffleColors as an argument
createDivsForColors(shuffledColors);
