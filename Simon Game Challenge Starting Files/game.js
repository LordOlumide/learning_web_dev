var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var gameStarted = false;
var level = 0;
var acceptingInput = false;

// Returns a number between 0 and X exclusive
function randomOf4Numbers() {
  return Math.floor(Math.random() * 4);
}

document.addEventListener("keydown", function () {
  if (gameStarted === false) {
    startGame();
  }
});

function startGame() {
  gameStarted = true;
  nextSequence(level);
}

function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

async function nextSequence() {
  level++;
  $("h1")[0].textContent = `Level ${level}`;

  await delay(1000);
  for (var i = 0; i < level; i++) {
    var randomNumber = randomOf4Numbers();
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    animateButtonPress(randomChosenColour);
    playSoundOfColour(randomChosenColour);

    await delay(300);
  }

  acceptingInput = true;
}

function checkAnswer() {
  var isCorrect = true;
  for (var i = 0; i < userClickedPattern.length; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      isCorrect = false;
      break;
    }
  }
  return isCorrect;
}

// Button Click gesture detector
$(".btn").on("click", function (event) {
  if (acceptingInput === false) {
    return;
  }

  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  animateButtonPress(userChosenColour);
  playSoundOfColour(userChosenColour);

  console.log(gamePattern);
  console.log(userClickedPattern);
  console.log(checkAnswer());

  if (checkAnswer() === true) {
    if (userClickedPattern.length === gamePattern.length) {
      levelPassed();
    }
  } else {
    gameOver();
  }
});

function levelPassed() {
  acceptingInput = false;
  gamePattern = [];
  userClickedPattern = [];
  nextSequence();
}

async function gameOver() {
  acceptingInput = false;
  gamePattern = [];
  userClickedPattern = [];

  var gameOverSound = new Audio("./sounds/wrong.mp3");
  gameOverSound.play();

  $("body").addClass("game-over");
  await delay(200);
  $("body").removeClass("game-over");

  $("h1")[0].textContent = "Game Over, Press Any Key to Restart";
  level = 0;
  gameStarted = false;
}

function playSoundOfColour(colour) {
  var buttonSound = new Audio(`./sounds/${colour}.mp3`);
  buttonSound.play();
}

async function animateButtonPress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  await delay(100);
  $(`#${currentColour}`).removeClass("pressed");
}
