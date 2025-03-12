const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

const playerWidth = 10, playerHeight = 100, ballSize = 10;
let player1Y = (canvas.height - playerHeight) / 2;
let player2Y = (canvas.height - playerHeight) / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 5;

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}

function drawNet() {
    for (let i = 0; i < canvas.height; i += 15) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, 'white');
    }
}

function draw() {
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    drawNet();
    drawRect(0, player1Y, playerWidth, playerHeight, 'white');
    drawRect(canvas.width - playerWidth, player2Y, playerWidth, playerHeight, 'white');
    drawCircle(ballX, ballY, ballSize, 'white');
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballX <= 0 || ballX >= canvas.width) {
        ballSpeedX = -ballSpeedX;
        resetBall();
    }
    if (ballX <= playerWidth && ballY > player1Y && ballY < player1Y + playerHeight) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX >= canvas.width - playerWidth && ballY > player2Y && ballY < player2Y + playerHeight) {
        ballSpeedX = -ballSpeedX;
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function movePaddle(event) {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    const mouseY = event.clientY - rect.top - root.scrollTop;
    player1Y = mouseY - playerHeight / 2;
}

canvas.addEventListener('mousemove', movePaddle);

function gameLoop() {
    draw();
    moveBall();
    requestAnimationFrame(gameLoop);
}

gameLoop();