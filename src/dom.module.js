import Board from "./board.module";

let getSquares = () => {
    return document.querySelectorAll('.square');
}

let getSquareData = (x, y) => {
    return document.querySelector(`[data-x="${x}"][data-y="${y}"]`);
}

const util = document.getElementById('util');
const status = document.getElementById('status');



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
            square.dataset.row = y;
            square.dataset.column = i;
            square.dataset.x = y;
            square.dataset.y = i;

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

    util.textContent = '';
}

let setEndSquare = () => {
    status.textContent = 'Select your destination';
    getSquares().forEach(square => {
        if(square.style.backgroundColor === '#FE9000'){
            Board.resetEnd();
            if(square.classList.contains('white')){
                square.style.backgroundColor = 'antiquewhite';
            } else {
                square.style.backgroundColor = 'black';
            }
        }
        square.addEventListener('click', clickHandler, true)
    })
}

let clickHandler = (e) => {
    status.textContent = '';
    if (Board.checkIfValidDestination(e.target)){
        Board.getFinalCoords(e.target);
        let destination = getSquareData(e.target.dataset.x, e.target.dataset.y);
        destination.style.backgroundColor = "#FE9000";
        getSquares().forEach(square => {
            square.removeEventListener('click', clickHandler, true);
        })
    }
}

let setKnightStart = () => {
    status.textContent = 'Select your Starting Point';
    getSquares().forEach(square => {
        square.addEventListener('click', addStartingSquare, true);
    })
}

let addStartingSquare = (e) => {
    status.textContent = '';
    resetAll()
    let start = getSquareData(e.target.dataset.x, e.target.dataset.y);
    Board.getInitialCoords(start);
    Board.getPossibleMoves(Board.initialX, Board.initialY);
    console.log(Board)
    start.style.backgroundColor = '#5DA271';
    getSquares().forEach(square => {
        square.removeEventListener('click', addStartingSquare, true);
    })
}

let setRandomPositions = () => {
    resetAll();
    let x = Math.floor(Math.random() * 8);
    let y = Math.floor(Math.random() * 8);

    let randomStart = getSquareData(x, y);
    randomStart.style.backgroundColor = '#5DA271';
    Board.getInitialCoords(randomStart);
    Board.getPossibleMoves(Board.initialX, Board.initialY);

    x = Math.floor(Math.random() * 8);
    y = Math.floor(Math.random() * 8);
    let randomEnd = getSquareData(x, y);
    Board.getFinalCoords(randomEnd);
    randomEnd.style.backgroundColor = "#FE9000";
}

let runSimulation = () => {
    let path = Board.findPath();
    util.textContent = `The Knights path: ${JSON.stringify(path)}`;
    return console.log(Board.findPath());
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
