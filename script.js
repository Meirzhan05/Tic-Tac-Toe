const grids = document.querySelectorAll('.grid');
const option = document.getElementById('shapeOption');
const buttons = document.querySelectorAll('button')
let user;
let computer;
let board = [
    " ", " ", " ",
    " ", " ", " ",
    " ", " ", " ",
];

document.addEventListener('DOMContentLoaded', () => {
    option.showModal();
});

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        userShape = button.value;
        if (userShape === "X") {
            user = createPlayer("X");
            computer = createPlayer("O");
        } else {
            user = createPlayer("O");
            computer = createPlayer("X");
        }
    });
});

grids.forEach((grid) => {
    grid.addEventListener('click', () => {
        if (isFinished(board, user.shape) || isFinished(board, computer.shape)) {
            return;
        }

        if (user.shape == "X") {
            grid.classList.add("one");
        } else if (user.shape == "O") {
            grid.classList.add("zero");
        }

        if (grid.textContent === "") {
            grid.textContent = user.shape;
        }
        makeMove(board, parseInt(grid.id));
        
    })
});

function createPlayer(shape) {
    let squaresOccupied = [];

    const getSquaresOccupied = () => squaresOccupied;
    const addSquareOccupied = (square) => squaresOccupied.push(square);

    return {
        shape,
        getSquaresOccupied,
        addSquareOccupied,
    }
}

function makeMove(board, index) {
    let declareWinner = document.querySelector('#declareWinner');
    
    if (board[index] === " " && !isFinished(board, user.shape)) {
        board[index] = user.shape;
        if (isFinished(board, user.shape)) {
            declareWinner.textContent = "You won.";       
        } else {
            makeOpponentMove(board, computer.shape);
        }

    } else {
        declareWinner.textContent = "Can't do it";       
    } 



}

function makeOpponentMove(board, shape) {
    let availableIndexes = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === " ") {
            availableIndexes.push(i);
        }
    }

    let ranIndex = Math.floor(Math.random() * availableIndexes.length);

    board[availableIndexes[ranIndex]] = shape;
    let grid = document.getElementById(availableIndexes[ranIndex]);
    if (shape == "X") {
        grid.classList.add("one");
    } else if (shape == "O") {
        grid.classList.add("zero");
    }    
    grid.textContent = shape
    if (isFinished(board, computer.shape)) {
        declareWinner.textContent = "You lost...";       
    }
}

function isFinished(board, shape) {
    // Row
    for (let row = 0; row < board.length; row++) {
        if (board[row * 3] === shape && board[row * 3 + 1] === shape && board[row * 3 + 2] === shape) {
            return true;
        } 
    }

    // Column
    for (let column = 0; column < 3; column++) {
        if (board[column] === shape && board[column + 3] === shape && board[column + 6] === shape) {
            return true;
        }
    }    

    // Diagonals
    if (board[0] == shape && board[4] === shape && board[8] === shape) {
        return true;
    } else if (board[2] == shape && board[4] === shape && board[6] === shape) {
        return true;
    } 
    return false;
}