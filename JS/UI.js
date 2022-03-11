class UI {
  constructor(config) {
    this.game = config.game;
  }
  
  createElements() {
    this.score = document.createElement("div");
    this.score.classList.add("Score");
    this.score.innerHTML = (`
      <p>${this.game.score}</p>
    `);
    
    this.health = document.createElement("div");
    this.health.class.add("Health");
  }
  
  init(container) {
    this.createElements();
    container.appendChild(this.score);
    container.appendChild(this.health);
  }
}
