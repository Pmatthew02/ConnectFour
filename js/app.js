var player1 = 'p1';
var player2 = 'p2';
var currentPlayer = player1;

const playerTurn = document.getElementById('playerTurn');
const startScreen = document.querySelector('.startScreen');
const startButton = document.getElementById('start');
const message = document.getElementById('message');

var gameOver = false;
var board;
var currentColumns;

var rows = 6;
var columns = 7;

window.onload = function(){
    
    setGame()
}
function setGame(){
    board = [];
    currentColumns = [5,5,5,5,5,5,5]
    
    for(let r = 0; r < rows;r++){
        let row = [];
        for(let c = 0;c < columns;c++){
         row.push(' ');

         let tile = document.createElement('div');
         tile.id = r.toString() + '-' + c.toString();
         tile.classList.add('tile');
         tile.addEventListener('click',setPiece);
         document.getElementById('board').append(tile);
        }
        board.push(row);
    }
}

function setPiece(){
    if (gameOver){
        return;
    }

    let coords = this.id.split('-');
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    r =currentColumns[c]
    if (r < 0){
        return;
    }

    board[r][c] = currentPlayer;
    let tile = document.getElementById(r.toString() + '-' + c.toString());
    if(currentPlayer == player1){
        tile.classList.add('purple-piece');
        currentPlayer = player2;
}
else {
    tile.classList.add('blue-piece');
    currentPlayer = player1;
}
r -= 1;
currentColumns[c] = r;
checkWinner();
}

function checkWinner(){
    for(let r = 0; r < rows; r++){
       for(let c = 0; c < columns - 3;c++){
        if(board[r][c] != ' '){
            if(board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]){
                setWinner(r, c);
                return;
            }
          }
       }
    }
    for(let c = 0;c < columns;c++){
        for(let r = 0;r < rows - 3;r++){
            if (board[r][c]!= ' '){
                if(board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]){
                    setWinner(r, c);
                        return;
                }
            }
        }
    }
    for(let r= 0;r < rows - 3;r++){
        for(let c = 0;c < columns - 3;c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    for(let r= 3;r < rows;r++){
        for(let c = 0;c < columns - 3;c++){
            if(board[r][c] != ' '){
                if(board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]){
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    
}
function setWinner(r, c){
    let winner = document.getElementById("winner");
    if(board[r][c] == player1){
        winner.innerText = 'Player 1 wins!';
    } else{
        winner.innerText = "Player 2 wins!";
    }
    gameOver = true;
}