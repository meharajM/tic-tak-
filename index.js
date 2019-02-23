/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

function player(params) {
    this.values = [];
    this.name = params.name;
}
player.prototype.isSameRow = function isSameRow() {
    const count = {0: 0, 1: 0, 2: 0};
    this.values.forEach(element => {
        count[element.y] +=1
    });
    return count[0] === 3 || count[1] === 3 || count[2] === 3;
}
player.prototype.isSameCol = function isSameCol() {
    const count = {0: 0, 1: 0, 2: 0};
    this.values.forEach(element => {
        count[element.x] +=1
    });
    return count[0] === GRID_LENGTH || count[1] === GRID_LENGTH || count[2] === GRID_LENGTH;   
}

player.prototype.isDiagonal = function isDiagonal() {
    let count = 0;
    this.values.forEach(element => {
        if (element.x === element.y) {
            count ++;
        }
    });
    return count === 3;
}

player.prototype.isWinner = function getValues() {
    var isWinner = false;
    return this.isSameRow() || this.isSameCol() || this.isDiagonal();
}
player.prototype.setValue = function setValue(value) {
    this.values.push(value);
    console.log(this.values);
}


let players = [];
let grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
let currentPlayer = 0;
function initializeGrid() {
    const player1 = new player({name: 'player1'});
    const player2 = new player({name: 'player2'});
    players = [player1, player2];
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    const grid = document.querySelector('.gridTop');
    grid.setAttribute('class', 'gridTop player'+ currentPlayer)
    const winner = (currentPlayer + 1);
    parent.innerHTML = '<div class="columnsStyle player'+winner+'">' + columnDivs + '</div>';
}
function validateWinner(player) {
    console.log(player.isWinner());
   return player.isWinner();
}
function announceWinner (player) {
    alert ("winner: "+ player.name);
    initializeGrid();
    players = [];
    grid = [];
    remooveClickHandlers();
    location.reload();
}
function changePlayer(player) {
    currentPlayer = Number(!currentPlayer)
    const playerNode = document.getElementById('player');
    const playerName = player.name;
    playerNode.innerHTML = '<span class="player">player '+ playerName + '</span>';
}
function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    console.log('current Player:'+grid);
    const player = players[currentPlayer];
    player.setValue({x: rowIdx, y: colIdx})
    let newValue = currentPlayer + 1;
    grid[colIdx][rowIdx] = newValue;
    if (!validateWinner(player)) {
        renderMainGrid();
        addClickHandlers();
        changePlayer(player);
    } else {
        console.log(player);
        announceWinner(player);
    }
    
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}
function remooveClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].removeEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
