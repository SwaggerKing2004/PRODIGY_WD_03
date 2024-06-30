let currentPlayer = 'X';

function makeMove(cellId) {
    const cell = document.getElementById(cellId);
    if (cell.value === '') {
        cell.value = currentPlayer;
        cell.style.color = "black";
        if (checkWin()) {
            document.getElementById('print').innerText = `Player ${currentPlayer} won`;
            disableAllCells();
        } else if (checkTie()) {
            document.getElementById('print').innerText = "Match Tie";
        } else {
            currentPlayer = (currentPlayer === 'X') ? '0' : 'X';
            document.getElementById('print').innerText = `Player ${currentPlayer} Turn`;
        }
    }
}

function checkWin() {
    const cells = [];
    for (let i = 1; i <= 9; i++) {
        cells[i] = document.getElementById(`b${i}`).value;
    }

    const winPatterns = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
        [1, 5, 9], [3, 5, 7] // Diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            highlightCells(pattern);
            return true;
        }
    }
    return false;
}

function checkTie() {
    for (let i = 1; i <= 9; i++) {
        if (document.getElementById(`b${i}`).value === '') {
            return false;
        }
    }
    return true;
}

function disableAllCells() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`b${i}`).disabled = true;
    }
}

function highlightCells(pattern) {
    pattern.forEach(index => {
        document.getElementById(`b${index}`).style.color = 'red';
    });
}

function resetGame() {
    for (let i = 1; i <= 9; i++) {
        const cell = document.getElementById(`b${i}`);
        cell.value = '';
        cell.disabled = false;
        cell.style.color = 'black';
    }
    currentPlayer = 'X';
    document.getElementById('print').innerText = 'Player X Turn';
}
