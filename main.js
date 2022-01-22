alert('starting');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 720;

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

loop();
