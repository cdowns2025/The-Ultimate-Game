//Wait for the window to load
window.addEventListener("load", () => {
 
  //Create the game!
  const game = new Game({
    //Pass in the game container from the DOM
    element: document.querySelector(".game-container"),
  });
  
  //Initialize the game
  game.init();
});
