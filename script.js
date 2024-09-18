// Getting references
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const winningMessageTextElement = document.querySelector('.message-text');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const playerXElement = document.getElementById('playerX');
const playerOElement = document.getElementById('playerO');

// Scoreboard elements
const scoreXElement = document.querySelector('#scoreX .score');
const scoreOElement = document.querySelector('#scoreO .score');
const drawsElement = document.querySelector('#draws .score');

let scoreX = 0;
let scoreO = 0;
let draws = 0;

// Player X starts first
let isXTurn = true;

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    isXTurn = true;
    cellElements.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    setActivePlayer();
    winningMessageElement.style.display = 'none';
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isXTurn ? 'x' : 'o';
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
        setActivePlayer();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    isXTurn = !isXTurn;
}

function setBoardHoverClass() {
    board.classList.remove('x');
    board.classList.remove('o');
    if (isXTurn) {
        board.classList.add('x');
    } else {
        board.classList.add('o');
    }
}

function setActivePlayer() {
    playerXElement.classList.toggle('active-player', isXTurn);
    playerOElement.classList.toggle('active-player', !isXTurn);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.textContent = "It's a Draw!";
        draws++;
        drawsElement.textContent = draws;
    } else {
        winningMessageTextElement.textContent = `${isXTurn ? "X" : "O"} Wins!`;
        if (isXTurn) {
            scoreX++;
            scoreXElement.textContent = scoreX;
        } else {
            scoreO++;
            scoreOElement.textContent = scoreO;
        }
    }
    winningMessageElement.style.display = 'flex';
}
