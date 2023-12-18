const grids = document.querySelectorAll('.grid');
const user = createPlayer("X");
const computer = createPlayer("O")
let board = [
    " ", " ", " ",
    " ", " ", " ",
    " ", " ", " ",
]

// Note: Scanning the board for empty squares

grids.forEach((grid) => {
    grid.addEventListener('click', (event) => {
        if (isFinished(board, user.shape) || isFinished(board, computer.shape)) {
            return;
        }
        if (user.shape == "X") {
            grid.classList.add("one");
        } else if (grid.textContent == "O") {
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
    if (board[index] === " " && !isFinished(board, user.shape)) {
        board[index] = user.shape;
        
        if (isFinished(board, user.shape)) {
            console.log(`${user.shape} won the game!!!`)
        } else if (isFinished(board, computer.shape)) {
            console.log(`${computer.shape} won the game!!!`)
        } else {
            makeOpponentMove(board, computer.shape);
        }


    } else {
        console.log("Can't make a move!");
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