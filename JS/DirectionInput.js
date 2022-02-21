/*
  Class Name: DirectionInput
  
  Description: A class that will handle inputs and correlate them to different directions
  
  Arguments: N/A
      
  Functions:
    get Direction():
      Description: A geter that returns a direction
      Arguments: N/A
    Init():
      Description: Sets up all of the keydown and keyup listeners
      Arguments: N/A
*/

class DirectionInput {
  constructor() {
    //This is an array that will store every key currently pressed
    this.heldDirections = [];
    
    //This is a map that correlates key presses with directions
    this.map = {
      "KeyW": "up",
      "ArrowUp": "up",
      "KeyS": "down",
      "ArrowDown": "down",
      "KeyD": "right",
      "ArrowRight": "right",
      "KeyA": "left",
      "ArrowLeft": "left",
    };
    
  }
  
  get direction() {
    //This returns the first key in the array
    return this.heldDirections[0];
  }
  
  init() {
    //Add an event listener for key down
    document.addEventListener("keydown", e => {
      //This checks to see if the key pressed is in the map and then if it is, assigns it the direction
      const dir = this.map[e.code];
      
      //If there is a direction and it isn't currently in the heldDirections array, then we add it to the beginning of the heldDirections array
      if (dir && this.heldDirections.indexOf(dir) === -1) {
        this.heldDirections.unshift(dir);
      }
    });
    
    //Add an event listener for key up
    document.addEventListener("keyup", e => {
      //Getting the direction and the index of the direction
      const dir = this.map[e.code];
      const index = this.heldDirections.indexOf(dir);
      
      //If the direction is in the array, then we will remove it
      if (index > -1) {
        this.heldDirections.splice(index, 1);
      }
    });
  }
}
