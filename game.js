// Global Game Variables
let GAME_STATES = {
  START: true,
  ACTIVE: false,
  PAUSED: false,
  GAME_OVER: false,
};

let currentlevel;

let globalRatio;

window.addEventListener('load', () => {
  //sets up the canvas
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 720;
  canvas.height = window.innerHeight - 100;

  globalRatio = canvas.height / 10; // ten is used because it's the number of rows in the current level. This is because the only variable dimension of the canvas is height, and rows pertain to height.

  //private game variables

  const level1 = `1111111111111111111111111111111111111111
1100000000000000000000000000000000000011
1000000010000000000100000000000000000001
1000000000000000000000100000000000000001
1000000000000000000000000000000100000001
1000000000100000000000000000000000000001
1000000000000000000001000000000010000001
1000000010000000000000000000000000000001
1100000000000000000000000000000000000011
1111111111111111111111111111111111111111`;

    //groups the 0s and 1s of the level above into a state the code can organize.
function parse(lvl) {
  const lines = lvl.split("\n");
  const characters = lines.map(l => l.split(""));
  return characters;
}

  //Inputs
  document.addEventListener('keypress', function(event) {
    if (event.key == "=") { //starts the game when "+" is pressed, toggles pause and play
      if (GAME_STATES.START == true) {
        GAME_STATES.ACTIVE = true;
        GAME_STATES.START = false;
      } else if (GAME_STATES.ACTIVE == true) {
        GAME_STATES.PAUSED = true;
        GAME_STATES.ACTIVE = false;
      } else if (GAME_STATES.PAUSED == true) {
        GAME_STATES.ACTIVE = true;
        GAME_STATES.PAUSED = false;
      }
    }
  });


  //draws every frame
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
      //draws the level based on currentlevel with a loop that goes through each array element, detects whether or not it's filled, then fills it
      ctx.fillStyle = "black";
      for (let row = 0; row < currentlevel.length; row++) {
        for (let col = 0; col < currentlevel[0].length; col++) {
          if (currentlevel[row][col] === "1") {
          ctx.fillRect(col * globalRatio - player.x, row * globalRatio, globalRatio + 1, globalRatio + 1); //draws level dimensions in proportion to the screen, "+1"'s are to make sure there's no gaps between cells
          }
        }
      }

    }
  }

  function main() {
    animate();
    currentlevel = parse(level1); //really should switch this out later for a function like a level manager, will do for now.
    requestAnimationFrame(main);
  }

  main();
});