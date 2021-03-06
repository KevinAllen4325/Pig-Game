var scores, roundScore, activePlayer, gamePlaying, userScore;
init();

function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	document.querySelector('.dice').style.display = 'none';

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	userScore = 100;
	document.getElementById('currentScore').textContent = 100;
}

function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.dice').style.display = 'none';


// User changes score limit
document.querySelector('input').onkeypress = function (e) {
	if (!e) e = window.event;
	var keyCode = e.keyCode || e.which;
	if (keyCode == '13') {
		userScore = this.value
		e.currentTarget.value = "";
		//Display current score count
		document.getElementById('currentScore').textContent = userScore;
	}
}

//Roll button
document.querySelector('.btn-roll').addEventListener('click', function () {
	if (gamePlaying) {
		//Random Number
		var dice = Math.floor(Math.random() * 6) + 1;

		//Display Result
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = "block";
		diceDOM.src = 'dice-' + dice + '.png';

		//Update the roundscore IF the rolled number was NOT 1
		if (dice !== 1) {
			//Add Score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			//Next Player
			nextPlayer();
		}
	}
});
//Hold button
document.querySelector('.btn-hold').addEventListener('click', function () {
	if (gamePlaying) {
		// Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;

		//Update UI
		document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

		//Check if player won the game
		if (scores[activePlayer] >= userScore | scores[activePlayer] >= 100) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			//Next player
			nextPlayer();
		}
	}

});
//New game
document.querySelector('.btn-new').addEventListener('click', init);
