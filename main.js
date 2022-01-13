alert('starting');

const canvas = document.getElementById('game_canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*function gameLoop() {
  requestAnimationFrame(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  });
};

gameLoop();*/
