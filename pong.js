const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 100;
let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
let leftPaddleSpeed = 0, rightPaddleSpeed = 0;

const ballSize = 10;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 3;

function drawRect(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawBall(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

function movePaddles() {
    leftPaddleY += leftPaddleSpeed;
    rightPaddleY += rightPaddleSpeed;
    leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddleY));
    rightPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddleY));
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    
    if (ballX <= paddleWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
    
    if (ballX >= canvas.width - paddleWidth && ballY >= rightPaddleY && ballY <= rightPaddleY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRect(0, leftPaddleY, paddleWidth, paddleHeight, "white");
    drawRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight, "white");
    drawBall(ballX, ballY, ballSize, "white");
}

function update() {
    movePaddles();
    moveBall();
    draw();
    requestAnimationFrame(update);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "w") leftPaddleSpeed = -5;
    if (event.key === "s") leftPaddleSpeed = 5;
    if (event.key === "ArrowUp") rightPaddleSpeed = -5;
    if (event.key === "ArrowDown") rightPaddleSpeed = 5;
});

document.addEventListener("keyup", (event) => {
    if (event.key === "w" || event.key === "s") leftPaddleSpeed = 0;
    if (event.key === "ArrowUp" || event.key === "ArrowDown") rightPaddleSpeed = 0;
});

update();
