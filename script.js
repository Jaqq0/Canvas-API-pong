// kenttä
let board;
let boardWidth = 500;
let boardHeight = 500;
let context;

//pelaajat
let playerWidth = 10;
let playerHeight = 50;
let playerSpeed = 5;

let player1 = {
    x: 10,
    y: boardHeight / 2 - playerHeight / 2,
    width: playerWidth,
    height: playerHeight,
}

let player2 = {
    x: boardWidth - playerWidth - 10,
    y: boardHeight / 2 - playerHeight / 2,
    width: playerWidth,
    height: playerHeight,
}

// pallo
let ballWidth = 10;
let ballHeight = 10;

let ball = {
    x: boardWidth / 2 - ballWidth / 2,
    y: boardHeight / 2 - ballHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: 3,
    velocityY: 3,
}

// pisteet
let player1Score = 0;
let player2Score = 0;

// näppäinten tila
let keys = {};

// pelin aloitus
window.onload = function() {
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);

    requestAnimationFrame(update);
}

// pelin päivitys
function update() {
    requestAnimationFrame(update);

    // tyhjennä kenttä
    context.clearRect(0, 0, board.width, board.height);

    // liikutetaan pelaajia
    movePlayers();

    // liikutetaan palloa
    moveBall();

    context.fillStyle = "skyblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    context.fillRect(player2.x, player2.y, player2.width, player2.height);
    
    // piiretään pallo
    context.fillStyle = "white";
    context.fillRect(
        ball.x,
        ball.y,
        ball.width,
        ball.height
    );

    // piirretään pisteet
    context.font = "30px Arial";
    context.fillText(player1Score, boardWidth / 2 - 50, 40);
    context.fillText(player2Score, boardWidth / 2 + 40, 40);
}

// pelaajien liikkuminen
function movePlayers() {
    
    //pelaaja 1 w ja s
    if (keys["w"]) {
        player1.y -= playerSpeed;
    }

    if (keys["s"]) {
        player1.y += playerSpeed;
    }

    //pelaaja 2: nuolinäppäimet
    if (keys["ArrowUp"]) {
        player2.y -= playerSpeed;
    }

    if (keys["ArrowDown"]) {
        player2.y += playerSpeed;
    }

    // estetään pelaajia menemästä kentän ulkopuolelle
    if (player1.y < 0) {
        player1.y = 0;
    }

    if (player1.y + player1.height > boardHeight) {
        player1.y = boardHeight - player1.height;
    }

    if (player2.y < 0) {
        player2.y = 0;
    }

    if (player2.y + player2.height > boardHeight) {
        player2.y = boardHeight - player2.height;
}
}

// pallon liikkuminen
function moveBall() {

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // kimpoaminen ylä- ja alareunoista
    if (ball.y <= 0 || ball.y + ball.height >= boardHeight) {
        ball.velocityY *= -1;
    }

    // kimpoaminen pelaaja1
    if (collision(ball, player1)) {
        ball.velocityX = Math.abs(ball.velocityX);
    }

    // kimpoaminen pelaaja2
    if (collision(ball, player2)) {
        ball.velocityX = -Math.abs(ball.velocityX);
    }

    // pallo menee vasemmalta ohi
    if (ball.x + ball.width < 0) {
        player2Score++;
        resetBall();
    }

    // pallo menee oikealta ohi
    if (ball.x > boardWidth) {
        player1Score++;
        resetBall();
    }
}

// tarkistetaan törmäys
function collision(a, b) {

    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
}

// pallon palautus keskelle
function resetBall() {
    ball.x = boardWidth / 2 - ballWidth / 2;
    ball.y = boardHeight / 2 - ballHeight / 2;
    ball.velocityX *= -1;

    // satunnainen pystysuuntainen nopeus
    ball.velocityY = Math.random() > 0.5 ? 3 : -3;
}

// näppäin painettu
function keyDown(event) {
    keys[event.key] = true;
}

// näppäin vapautettu
function keyUp(event) {
    keys[event.key] = false;
}