window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  
  // Game Variables
  let GAME_STATES = {
    START: true,
    ACTIVE: false,
    PAUSED: false,
    GAME_OVER: false,
  };

  canvas.width = 720;
  canvas.height = window.innerHeight - 100;

  function animate() {
    // clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '100px VT323';
    ctx.fillStyle = 'white';
    ctx.fillText('SHIP DEFENDERS', 100, canvas.height / 2);
    
    requestAnimationFrame(animate);
  }

  animate();
});
