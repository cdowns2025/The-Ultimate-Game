class UI {
  constructor(config) {
    this.game = config.game;
    this.actualScore = this.game.score;
  }
  
  update(game) {
    this.actualScore = game.score;
    
    this.score.innerHTML = (`
      <p>${this.actualScore}</p>
    `);
  }
  
  createElements() {
    this.score = document.createElement("div");
    this.score.classList.add("Score");
    this.score.innerHTML = (`
      <p>${this.actualScore}</p>
    `);
    
    this.health = document.createElement("div");
    this.health.classList.add("Health");
    this.health.innerHTML = (`
      <img src="Heart.png" />
      <img src="Heart.png" />
      <img src="Heart.png" />
    `);
  }
  
  init(container) {
    this.createElements();
    container.appendChild(this.score);
    container.appendChild(this.health);
  }
}
