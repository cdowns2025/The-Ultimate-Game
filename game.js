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

  //Inputs
  document.addEventListener('keypress', function(event) {
    if (event.key == "=") { //starts the game when "+" is pressed
      if (GAME_STATES.START == true) {
        GAME_STATES.ACTIVE = true;
        GAME_STATES.START = false;
      }
    }
  });

  function animate() {
    // clear the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (GAME_STATES.START == true) { //draws the start screen
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '100px VT323';
      ctx.fillStyle = 'white';
      ctx.fillText('SHIP DEFENDERS', 90, canvas.height / 2);
      ctx.font = '50px VT323';
      ctx.fillText("Press '+' to start", 180, (canvas.height / 2) + 70);
    }
    if (GAME_STATES.ACTIVE == true) { //draws the active state of the game
    
    }
  }

  function main() {
    animate();
    requestAnimationFrame(main);
  }

  main();
});
