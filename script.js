const levelInputs = document.getElementsByName("level");

let player = prompt("How art thou called?");
if (!player) player = "player";
player = player.charAt(0).toUpperCase() + player.slice(1).toLowerCase();

let guessCount = 0;
let scores = [];
let times = [];

let answer, range;

let timeInterval = setInterval(time, 37);

function play() {
    for (let i = 0; i < levelInputs.length; i++) {
        if (levelInputs[i].checked) {
            range = parseInt(levelInputs[i].value);
            levelInputs[i].disabled = true;
        }
    }

    document.getElementById("msg").textContent = `Good day, ${player}! Guess a number from 1 to ${range}`;

    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;

    answer = Math.floor(Math.random() * range) + 1;

    times.push(new Date());
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
        return;
    }
    else if (guess < answer) {
        msg.textContent = "Too low, try again";
    }
    else {
        msg.textContent = "Too high, try again";
    }

    if (Math.abs(guess - answer) <= 2) {
        msg.textContent += `; you may have ${(guess < answer) ? "undershot" : "overshot"}, but you're very close.`;
    }
    else if (Math.abs(guess - answer) <= 5) {
        msg.textContent += "; your guesses are beginning to swarm around the answer.";
    }
    else {
        msg.textContent += "; not even close—if I could scold you for this guess, I would.";
    }
}

function updateScore(score) {
    scores.push(score);
    scores.sort((a, b) => a - b);

    updateTimers(new Date());

    document.getElementById("wins").textContent = `Total wins: ${scores.length}`;

    avgScore.textContent = `Average Score: ${(scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)}`;

    let leaderboard = document.getElementsByName("leaderboard");
    for (let i = 0; i < Math.min(leaderboard.length, scores.length); i++) {
        leaderboard[i].textContent = scores[i];
    }

    reset();
}

function updateTimers(endMs) {
    const time = (endMs - times[times.length - 1]) / 1000;
    times[times.length - 1] = time;
    document.getElementById("msg").textContent += `; you took ${time.toFixed(2)} seconds.`;
    document.getElementById("fastest").textContent = `Fastest Game: ${Math.min(...times).toFixed(2)}s`
    document.getElementById("avgTime").textContent = `Average Time: ${(times.reduce((sum, e) => sum + e, 0) / times.length).toFixed(2)}s`;
}

function reset() {
    document.getElementById("guess").value = "";
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
    
    for (let i = 0; i < levelInputs.length; i++) {
        levelInputs[i].disabled = false;
    }

    guessCount = 0;
}

function time() {
    const rn = new Date();
    const hours = String(rn.getHours()).padStart(2, "0");
    const minutes = String(rn.getMinutes()).padStart(2, "0");
    const seconds = String(rn.getSeconds()).padStart(2, "0");
    const ms = String(rn.getMilliseconds()).padStart(3, "0");
    document.getElementById("date").innerHTML = `${{0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June", 6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"}[rn.getMonth()]} ${rn.getDate()}, ${rn.getFullYear()}<br>${hours}:${minutes}:${seconds}.${ms}`;
}