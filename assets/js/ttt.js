let currentPlayer,
  player1,
  player2,
  board,
  timerId,
  timeLeft = 60;

function startGame() {
  player1 = document.getElementById("player1").value || "Player 1";
  player2 = document.getElementById("player2").value || "Player 2";
  let p1Symbol = document.getElementById("symbol").value;
  let p2Symbol = p1Symbol === "X" ? "O" : "X";

  currentPlayer = p1Symbol;
  board = Array(9).fill("");

  document.getElementById(
    "status"
  ).textContent = `${player1} (${p1Symbol}) vs ${player2} (${p2Symbol}) - ${player1}'s Turn`;

  drawBoard();
  startTimer();
}

function drawBoard() {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = "";
  board.forEach((val, idx) => {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = idx;
    cell.textContent = val;
    cell.onclick = () => handleMove(idx);
    gameBoard.appendChild(cell);
  });
}

function handleMove(index) {
  if (board[index] !== "") return;

  board[index] = currentPlayer;
  drawBoard();

  if (checkWin(currentPlayer)) {
    clearInterval(timerId);
    const winner =
      currentPlayer === document.getElementById("symbol").value
        ? player1
        : player2;
    document.getElementById("status").textContent = `${winner} wins! 🎉`;
    setTimeout(() => location.reload(), 8000);
    return;
  }

  if (board.every((cell) => cell !== "")) {
    clearInterval(timerId);
    document.getElementById("status").textContent = "It's a Draw! 🤝";
    setTimeout(() => location.reload(), 8000);
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  const currentName =
    currentPlayer === document.getElementById("symbol").value
      ? player1
      : player2;
  document.getElementById("status").textContent = `${currentName}'s Turn`;
}

function checkWin(symbol) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return winPatterns.some((pattern) =>
    pattern.every((index) => board[index] === symbol)
  );
}

function startTimer() {
  clearInterval(timerId);
  timeLeft = 60;
  updateTimerDisplay();
  timerId = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerId);
      document.getElementById("status").textContent =
        "Time's up! It's a Draw! ⏰";
      setTimeout(() => location.reload(), 8000);
    }
  }, 1000);
}

function updateTimerDisplay() {
  document.getElementById("timer").textContent = `Time Left: ${timeLeft}s ⏳`;
}
