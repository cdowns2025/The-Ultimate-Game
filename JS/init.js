//Wait for the window to load
window.addEventListener("load", () => {
 
  alert("Please click in the game screen to continue");
 
  //Create the game!
  const game = new Game({
    //Pass in the game container from the DOM
    element: document.querySelector(".game-container"),
  });
  
  //Initialize the game
  game.init();
});
