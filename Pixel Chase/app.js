const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('start-btn');
const restartScreen = document.getElementById('restart-screen');
const restartBtn = document.getElementById('restart-btn');
const scoreDisplay = document.getElementById('score');
const result = document.getElementById('result');
const player = document.getElementById('player');

let gameInterval, scoreInterval, speedInterval;
let playerX = 180;
let score = 0;
let speed = 4;

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveLeft();
    else if (e.key === 'ArrowRight') moveRight();
});

function moveLeft() {
    if (playerX > 0) {
        playerX -= 20;
        player.style.left = playerX + 'px';
    }
}

function moveRight() {
    if (playerX < 360) {
        playerX += 20;
        player.style.left = playerX + 'px';
    }
}

function createBlock() {
    const block = document.createElement('div');
    const isPowerUp = Math.random() < 0.2;

    block.classList.add(isPowerUp ? 'powerup' : 'block');

    block.style.left = Math.floor(Math.random() * 360) + 'px';
    document.getElementById('game').appendChild(block);

    let blockY = 0;
    const fall = setInterval(() => {
        blockY += speed;
        block.style.top = blockY + 'px';

        const playerRect = player.getBoundingClientRect();
        const blockRect = block.getBoundingClientRect();

        if (
            blockRect.bottom > playerRect.top &&
            blockRect.top < playerRect.bottom &&
            blockRect.left < playerRect.right &&
            blockRect.right > playerRect.left
        ) {
            if (block.classList.contains('powerup')) {
                score += 10;
                scoreDisplay.textContent = "Score: " + score;
                block.remove();
                clearInterval(fall);
                return;
            }

            console.log("💥 Collision with red block detected!");

            // Flash effect
            player.classList.remove('flash');
            void player.offsetWidth;
            player.classList.add('flash');

            if (player.classList.contains('flash')) {
                console.log("✅ Flash class added to player");
            } else {
                console.log("❌ Flash class NOT added");
            }
            clearInterval(fall);
            clearInterval(scoreInterval);
            clearInterval(gameInterval);
            clearInterval(speedInterval);
            
            restartScreen.style.display = "flex";
            result.innerText = score
            console.log(score)
            document.querySelectorAll('.block').forEach(b => b.remove());
        }


        if (blockY > 600) {
            block.remove();
            clearInterval(fall);
        }
    }, 20);
}

function startGame() {
    score = 0;
    speed = 4;
    scoreDisplay.textContent = "Score: 0";
    playerX = 180;
    player.style.left = playerX + "px";

    startScreen.style.display = "none";
    restartScreen.style.display = "none";

    scoreInterval = setInterval(() => {
        score++;
        scoreDisplay.textContent = "Score: " + score;

        if (score % 20 === 0) {
            speed += 1;
            document.body.style.background = '#' + Math.floor(Math.random() * 16777215).toString(16);
        }
    }, 1000);


    gameInterval = setInterval(createBlock, 1000);

    speedInterval = setInterval(() => {
        speed += 0.2;
    }, 5000);
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);
