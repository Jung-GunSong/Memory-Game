"use strict";

/** Memory game: find matching pairs of cards and flip both of them. */

const FOUND_MATCH_WAIT_MSECS = 1000;
const COLORS = [
  "red", "blue", "green", "orange", "purple",
  "red", "blue", "green", "orange", "purple",
];

const gameBoard = document.getElementById("game");
const startBtn = document.getElementById("start-game");
const resumeBtn = document.getElementById("restart-game");
const currentScore = document.getElementById("score");
let cardIdCount = 1;

let revealedCards = [];
let revealedColors = [];
let matchedCards = [];
let score = 0;

const colors = shuffle(COLORS);

createCards(colors);
noMoreClicking();
updateScore();


/** Shuffle array items in-place and return shuffled array. */

function updateScore(){
  currentScore.textContent = `Current Score: ${score}`;
}

function shuffle(items) {
  // This algorithm does a "perfect shuffle", where there won't be any
  // statistical bias in the shuffle (many naive attempts to shuffle end up not
  // be a fair shuffle). This is called the Fisher-Yates shuffle algorithm; if
  // you're interested, you can learn about it, but it's not important.

  for (let i = items.length - 1; i > 0; i--) {
    // generate a random index between 0 and i
    let j = Math.floor(Math.random() * i);
    // swap item at i <-> item at j
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

/** Create card for every color in colors (each will appear twice)
 *
 * Each div DOM element will have:
 * - a class with the value of the color
 * - a click event listener for each card to handleCardClick
 */

function createCards(colors) {

  for (let color of colors) {
    // missing code here ...
    let card = document.createElement("div");
    card.setAttribute("id", `card-${cardIdCount}`);
    card.style.backgroundColor = color;
    card.classList.add("hidden", "card");
    gameBoard.append(card);
    card.addEventListener("click",handleCardClick)
    cardIdCount++;
  }
};

startBtn.addEventListener("click", function(){
  startBtn.classList.add("btn-success")
  console.log(`revealed cards is`, revealedCards);
  resumeClicking();
});

resumeBtn.addEventListener("click", function(){
  if (matchedCards.length === 10){
    for (let i = 1; i < 11; i++){
      let card = document.getElementById(`card-${i}`);
      unFlipCard(card);
      }
      score = 0;
    updateScore();
    startBtn.classList.remove("btn-success");
    resumeBtn.classList.remove("btn-warning");
    matchedCards = [];
    noMoreClicking();
    }
  });


/** Flip a card face-up. */

function flipCard(card) {
  card.classList.remove("hidden");
}

/** Flip a card face-down. */

function unFlipCard(card) {
  card.classList.add("hidden");
  revealedCards =[];
  revealedColors =[];
}

function isMatch(){
  let card1 = document.getElementById(revealedCards[0]);
  let card2 = document.getElementById(revealedCards[1]);
  if (revealedColors[0] !== revealedColors[1]){
    unFlipCard(card1);
    unFlipCard(card2);
  }else{
    matchedCards.push(card1.id);
    matchedCards.push(card2.id);
    revealedCards =[];
    revealedColors =[];
    console.log(`matchedCards is`, matchedCards);
  }
  if (matchedCards.length <10){
    resumeClicking();
  }else if (matchedCards.length === 10){
    resumeBtn.classList.add("btn-warning")
  }
  console.log(`matchedCards is `, matchedCards)
}

function noMoreClicking(){
  for (let i = 1; i < 11; i++){
    let card = document.getElementById(`card-${i}`);
    card.removeEventListener("click",handleCardClick)
  }
}

function resumeClicking(){
  for (let i = 1; i < 11; i++){
    let card = document.getElementById(`card-${i}`);
    card.addEventListener("click",handleCardClick);
  }
}
/** Handle clicking on a card: this could be first-card or second-card. */

function handleCardClick(e) {
  let card = e.currentTarget;

  if (matchedCards.includes(card.id) === false && revealedCards.includes(card.id) === false){
    score ++;
  updateScore();
    }

  if(revealedCards.length < 2 && revealedCards.includes(card.id) === false && matchedCards.includes(card.id) === false){
    revealedCards.push(card.id);
    revealedColors.push(card.style.backgroundColor);
    flipCard(card);
  }
  // console.log(revealedCards,revealedColors);
    // console.log(document.getElementById(revealedCards[0]));

    if (revealedCards.length === 2){
      noMoreClicking();
      setTimeout(isMatch,1000);
    }

  // console.log(revealedCards,revealedColors);

}
