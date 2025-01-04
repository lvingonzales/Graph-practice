// Create the board and its initial values, all equal to null
const Board = {
    initialX: null,
    initialY: null,
    finalX: null,
    finalY: null,
    
    // These are the possible move combinations put together in a matrix
    possibleX: [2, 1, -1, -2, -2, -1, 1, 2],
    possibleY: [1, 2, 2, 1, -1, -2, -2, -1],

    // This object stores the current move of the piece
    board: {},

    // This stores the initial position of the piece and acts as the base for the subsequent queue
    movesq: [],

    // This 2 dimensional array keeps track of the pieces previous moves.
    prev: [...Array(8)].map(() => Array(8).fill(0)),

    // Creates the board for the dom
    generate(){
        return [...Array(8)].map(() => Array(8).fill(''));
    },

    getInitialCoords(cell) {
        this.initialX = cell.x;
        this.initialY = cell.y;

        this.movesq = [];
        this.movesq.push([this.initialX, this.initialY]);
        this.board[JSON.stringify([this.initialX, this.initialY])] = 1;
    },

    getFinalCoords(cell) {
        this.finalX = cell.x;
        this.finalY = cell.y;
    },


    getPossibleMoves(x, y, possibleMoves = []) {
        for(let i = 0; i < 8; i++){
            let newX = x + this.possibleX[i];
            let newY = y + this.possibleY[i];
            if (newX >= 0 && newX <= 7 && newY >= 0 && newY <= 7){
                possibleMoves.push([newX, newY]);
            }
        }
        return possibleMoves;
    },

    findPath(queue = this.movesq){
        // Base case
        if(this.endingX === null || this.startingX === null) return;

        // Logic for finding the path
        while (queue.length){
            // The current location is replaced by the first thing in the queue
            const location = queue.shift();
            if(location[0] === this.finalX && location[1] === this.finalY) {break;}

            // Populates an array with every possible move from the current location
            const moves = this.getPossibleMoves(location[0], location[1]);

            // Adds the move to the queue and marks the move as previous on the appropriate squares
            moves.forEach(move => {
                if(this.board[JSON.stringify(move)]){return;}
                queue.push(move)
                this.board[JSON.stringify(move)] = 1;
                this.prev[move[0]][move[1]] = [location[0], location[1]];
            });
        }

        // This is the logic for returning the path
        let path = [];
        let curLocation = [this.finalX, this.finalY];
        while(curLocation[0] !== this.initialX || curLocation[1] !== this.initialY){
            path.unshift(curLocation);
            curLocation = this.prev[curLocation[0]][curLocation[1]];
        }
        path.unshift([this.initialX, this.initialY]);

        return path;
    },

    resetBoard() {
        this.initialX = null;
        this.initialY = null;
        this.finalX = null;
        this.finalY = null;
        this.board = {};
        this.movesq = [];
        this.prev = [...Array(8)].map(() => Array(8).fill(0));
    },
}

function knightMoves () {
}

export default Board;
