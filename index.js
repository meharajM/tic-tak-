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
    this.isAuto = params.isAuto;
}
player.prototype.isSameRow = function isSameRow() {
    const count = {0: 0, 1: 0, 2: 0};
    this.values.forEach(element => {
        count[element.y] +=1
    });
    return count[0] === GRID_LENGTH || count[1] === GRID_LENGTH || count[2] === GRID_LENGTH;
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
        if (element.x == element.y) {
            count ++;
        }
    });
    return count === GRID_LENGTH;
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
    const player2 = new player({name: 'player2', isAuto: true});
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
    isGameOver() && announceGameOver();
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
function getCoords() {
    let available = [];
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
           if (grid[colIdx][rowidx] === 0) {
               available.push({colIdx: colIdx, rowIdx: rowidx });
           }
        }
    }
    const index = Math.floor((Math.random() * available.length - 1) + 1);
    console.log("available co ords"+ JSON.stringify(available) );
    return available[index];
}
function changePlayer() {
    currentPlayer = Number(!currentPlayer)
    const playerNode = document.getElementById('player');
    const player = players[currentPlayer];
    const playerName = player.name;
    playerNode.innerHTML = '<span class="player">player '+ playerName + '</span>';
    
    if (player.isAuto) {
        const coords = getCoords();
        console.log("auto player coord"+ JSON.stringify(coords));
        setValueInGrid(coords.rowIdx, coords.colIdx);
    }
}
function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    console.log('current Player:'+grid);
    setValueInGrid(rowIdx, colIdx);
}
function announceGameOver() {
    console.log("game Over");
    
    setTimeout(function(){
        const ans = confirm("game over. do u want to restart ?" );
        if (ans) {
            location.reload(); 
        } 
    }, 10);
}
function setValueInGrid(rowIdx, colIdx) {
    if (!isGameOver()){
        const playerObj = players[currentPlayer];
        playerObj.setValue({x: rowIdx, y: colIdx})
        let newValue = currentPlayer + 1;
        grid[colIdx][rowIdx] = newValue;
        renderMainGrid();
        addClickHandlers();
    
        if (!validateWinner(playerObj)) {
            changePlayer();
        } else {
            console.log(playerObj);
            announceWinner(playerObj);
        }
    } else {
       announceGameOver();
    }

   
}
function isGameOver() {
    const p1over = players[0].values.length === GRID_LENGTH;
    const p2over = players[1].values.length === GRID_LENGTH;
    if( p1over && p2over) {
        return true;
    }
    return false;
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
