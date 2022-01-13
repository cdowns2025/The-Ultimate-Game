alert('starting');

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function loop() {
  requestAnimationFrame(() => {
    alert('I am cool');           
  });
}

loop();
