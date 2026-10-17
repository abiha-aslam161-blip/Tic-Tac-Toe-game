```javascript
// Get all cells and status message
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

// Store the game data
let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

// All possible winning combinations
const winningConditions = [
    [0, 1, 2], // First row
    [3, 4, 5], // Second row
    [6, 7, 8], // Third row

    [0, 3, 6], // First column
    [1, 4, 7], // Second column
    [2, 5, 8], // Third column

    [0, 4, 8], // Diagonal
    [2, 4, 6]  // Other diagonal
];

// Handle a player's move
function makeMove(index) {

    // Stop if game is over or cell is filled
    if (!gameActive || board[index] !== "") {
        return;
    }

    // Place X or O
    board[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].disabled = true;

    // Check for winner
    if (checkWinner()) {
        statusText.textContent = "🎉 Player " + currentPlayer + " wins!";
        gameActive = false;
        return;
    }

    // Check for draw
    if (!board.includes("")) {
        statusText.textContent = "🤝 It's a draw!";
        gameActive = false;
        return;
    }

    // Change player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = "Player " + currentPlayer + "'s turn";
}

// Check all winning combinations
function checkWinner() {

    for (let condition of winningConditions) {
        const [a, b, c] = condition;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            return true;
        }
    }

    return false;
}

// Restart the game
function restartGame() {
    currentPlayer = "X";
    gameActive = true;

    board = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(function(cell) {
        cell.textContent = "";
        cell.disabled = false;
    });

    statusText.textContent = "Player X's turn";
}
```