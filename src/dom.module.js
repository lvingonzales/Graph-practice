import Board from "./board.module";

let getSquares = () => {
    return document.querySelectorAll('.square');
}

let getSquareData = (x, y) => {
    return document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
}

const createBoard = (board = Board.generate()) => {
    const boardDiv = document.getElementById('board-grid');

    // Creates cells and assigns their properties: color, data, etc
    for(let i = 0; i < board.length; i++){
        let row = document.createElement('div');
        for(let y = 0; y < board[i].length; y++){
            let square = document.createElement('div');
            if (i % 2 === 0){
                if (y % 2 === 0){
                    square.classList.add('white');
                }else {
                    square.classList.add('black');
                }
            } else {
                if (y % 2 === 0){
                    square.classList.add('black');
                }else {
                    square.classList.add('white');
                }
            }

            square.dataset.color = square.classList;
            square.classList.add('square');
            square.dataset.row = i;
            square.dataset.column = y;
            square.dataset.x = i;
            square.dataset.y = y;

            row.appendChild(square);
        }
        row.classList.add('row');
        boardDiv.appendChild(row);
    }
}

let resetAll = () => {
    Board.resetBoard();
    getSquares().forEach(square => {
        if (square.classList.contains('white')){
            square.style.backgroundColor = 'antiquewhite';
        } else {
            square.style.backgroundColor = 'black';
        }
    })
}

let setEndSquare = () => {
    getSquares().forEach(square => {
        if*
    })
}

createBoard();
let reset = document.getElementById('reset');
let setKnight = document.getElementById('set-knight');
let setEndpoint = document.getElementById('set-endpoint');
let random = document.getElementById('random');
let runSim = document.getElementById('run-sim');

const eventListeners = {
    resetEvent() {
        return reset.addEventListener('click', resetAll);
    },

    setKnightEvent() {
        return setKnight.addEventListener('click', setKnightStart);
    },

    setEndpointEvent() {
        return setEndpoint.addEventListener('click', setEndSquare);
    },

    randomPositionEvent() {
        return random.addEventListener('click', setRandomPositions);
    },

    runSimEvent() {
        return runSim.addEventListener('click', runSimulation);
    },

    addListeners() {
        this.resetEvent();
        this.setKnightEvent();
        this.setEndpointEvent();
        this.randomPositionEvent();
        this.runSimEvent();
    }
}

export default eventListeners;
