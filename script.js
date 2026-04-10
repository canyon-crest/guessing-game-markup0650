const levelInputs = document.getElementsByName("level");

let player = prompt("How art thou called?");
if (!player) player = "player";
player = player.charAt(0).toUpperCase() + player.slice(1).toLowerCase();

let guessCount = 0;
let scores = [];

let answer, range;

function play() {
    for (let i = 0; i < levelInputs.length; i++) {
        if (levelInputs[i].checked) {
            range = parseInt(levelInputs[i].value);
            levelInputs[i].disabled = true;
        }
    }

    document.getElementById("msg").textContent = `Guess a number from 1 to ${range}`;

    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;

    answer = Math.floor(Math.random() * range) + 1;
}

document.getElementById("playBtn").addEventListener("click", play);
document.getElementById("guessBtn").addEventListener("click", makeGuess);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);

function giveUp() {
    document.getElementById("msg").textContent = `The answer was ${answer}.`;
    updateScore(range);
}

function makeGuess() {
    let guess = parseInt(document.getElementById("guess").value);

    if (!Number.isFinite(guess) || guess > range || guess < 1) {
        document.getElementById("msg").textContent = "Please enter a valid number";
        return;
    }

    guessCount++;

    if (guess === answer) {
        document.getElementById("msg").textContent = `Correct! ${player}: ${guessCount} tries.`;
        updateScore(guessCount);
    }
    else if (guess < answer) {
        msg.textContent = "Too low, try again.";
    }
    else {
        msg.textContent = "Too high, try again.";
    }

    if (Math.abs(guess.answer) <= 2) {
        msg.textContent += " You may have undershot or overshot, but you're very close.";
    }
    else if (Math.abs(guess.answer) <= 5) {
        msg.textContent += " Your guesses are beginning to swarm around the answer.";
    }
    else if (Math.abs(guess.answer) > 5) {
        msg.textContent += " Not even close—if I could scold you for this guess, I would.";
    }
}

function updateScore(score) {
    scores.push(score);
    scores.sort((a, b) => a - b);

    document.getElementById("wins").textContent = `Total wins: ${scores.length}`;

    avgScore.textContent = `Average Score: ${(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)}`;

    let leaderboard = document.getElementsByName("leaderboard");
    for (let i = 0; i < Math.min(leaderboard.length, scores.length); i++) {
        leaderboard[i].textContent = scores[i];
    }

    reset();
}

function reset() {
    document.getElementById("guess").value = "";
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
    
    for (let i = 0; i < levelInputs.length; i++) {
        levelInputs[i].disabled = true;
    }

    guessCount = 0;
    document.getElementById("msg").textContent = "Select a Level";
}