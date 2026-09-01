// kenttä
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

//pelaajat
let playerWidth = 10;
let playerHeight = 50;

let player1 = {
    x: 10,
    y: boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
}

let player2 = {
    x: boardWidth - playerWidth - 10,
    y: boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
}

// pelin aloitus
window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    requestAnimationFrame(update);
}

// pelin päivitys
function update() {
    requestAnimationFrame(update);

    context.fillStyle = "skyblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    context.fillRect(player2.x, player2.y, player2.width, player2.height);
}