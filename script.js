'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const switchPlayer = function () {
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	player0El.classList.toggle('player--active');
	player1El.classList.toggle('player--active');
}

const rollDice = function () {
	// 1.Generating a random dice roll
	const dice = Math.floor(Math.random() * 6) + 1;

	// 2.Display dice
	diceEl.classList.remove('hidden');
	diceEl.src = `dice-${dice}.png`;

	// 3.Check for rolled 1: if true, switch to next player
	if (dice !== 1) {
		// Add dice to current score
		currentScore += dice;
		document.getElementById(`current--${activePlayer}`).textContent = currentScore;
		// current0El.textContent = currentScore; // Change Score
	} else {
		// Switch to next player
		switchPlayer();
	}
}

const holdDice = function () {
	// 1. Add current score to active player's score
	scores[activePlayer] += currentScore;
	document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

	// 2. Check if player's score >= 100
	// Finish the game
	if (scores[activePlayer] >= 100) {
		diceEl.classList.add('hidden');
		scores[activePlayer] -= currentScore;

		document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
		document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

		btnRoll.removeEventListener('click', rollDice);
	} else {
		// Switch to next player
		switchPlayer();
	}
}

const newGame = function () {
	score0El.textContent = 0;
	score1El.textContent = 0;
	diceEl.classList.add('hidden');

	scores = [0, 0];
	currentScore = 0;
	activePlayer = 0;

	current0El.textContent = 0;
	current1El.textContent = 0;
	player0El.classList.remove('player--winner');
	player1El.classList.remove('player--winner');
	player0El.classList.add('player--active');
	player1El.classList.remove('player--active');

	// Restart Game
	btnRoll.addEventListener('click', rollDice);
}

// Rolling dice functionality
btnRoll.addEventListener('click', rollDice);
// Holding dice functionality
btnHold.addEventListener('click', holdDice);
// New Game reset functionality
btnNew.addEventListener('click', newGame);

// Rule Modal Window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalButton = document.querySelector('.close-modal');
const showModalButtons = document.querySelector('.btn--rules');

function showmodalWindow() {
	modal.classList.toggle('hidden--modal');
	overlay.classList.toggle('hidden--modal');
}

showModalButtons.addEventListener('click', showmodalWindow);
// Close Modal Button
closeModalButton.addEventListener('click', showmodalWindow);
// Close Modal Overlay Body
overlay.addEventListener('click', showmodalWindow);
// Close Modal on Esc
document.addEventListener('keydown', function (e) {
	if (e.key === 'Escape') {
		showmodalWindow();
	}
})