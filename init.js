window.addEventListener("load", () => {
  
  const game = new Game({
    element: document.querySelector(".game-container"),
  });
  
  game.init();
});
