var imageSrcs = [
  "./images/dice1.png",
  "./images/dice2.png",
  "./images/dice3.png",
  "./images/dice4.png",
  "./images/dice5.png",
  "./images/dice6.png",
];

function getRandomNum() {
  return Math.floor(Math.random() * 6);
}

var index1 = getRandomNum();
var index2 = getRandomNum();

console.log("index1 = " + index1 + " and index2 is " + index2);
console.log(document.getElementsByClassName("img1")[0]);

document
  .getElementsByClassName("img1")[0]
  .setAttribute("src", imageSrcs[index1]);
document
  .getElementsByClassName("img2")[0]
  .setAttribute("src", imageSrcs[index2]);

if (index1 > index2) {
  document.querySelector("h1").textContent = "🚩Player 1 Wins!";
} else if (index1 < index2) {
  document.querySelector("h1").textContent = "Player 2 Wins!🚩";
} else {
  document.querySelector("h1").textContent = "Draw!";
}
