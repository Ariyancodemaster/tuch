const circle = document.getElementById("circle");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");

let score = 0;
let timeLeft = 30;
let gameInterval;
let moveCircleInterval;

function getRandomPosition() {
  const maxX = gameContainer.clientWidth - circle.offsetWidth;
  const maxY = gameContainer.clientHeight - circle.offsetHeight;
  const x = Math.random() * maxX;
  const y = Math.random() * maxY;
  return { x, y };
}

function moveCircle() {
  const { x, y } = getRandomPosition();
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = score;
  timerDisplay.textContent = timeLeft;
  circle.style.display = "block";
  startBtn.disabled = true;

  moveCircle();
  moveCircleInterval = setInterval(moveCircle, 800);

  circle.onclick = () => {
    score++;
    scoreDisplay.textContent = score;
    moveCircle();
  };

  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(moveCircleInterval);
  circle.style.display = "none";
  alert(`Game Over! Your score: ${score}`);
  startBtn.disabled = false;
}

startBtn.addEventListener("click", startGame);
