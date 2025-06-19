const player = document.getElementById('player');
let playerX = 180;

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft' && playerX > 0) {
    playerX -= 20;
  } else if (e.key === 'ArrowRight' && playerX < 360) {
    playerX += 20;
  }
  player.style.left = playerX + 'px';
});
