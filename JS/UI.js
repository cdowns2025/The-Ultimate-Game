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
    
    if (this.actualScore === 6) {
      this.health.innerHTML = (`
        <img src="Heart.png" />
        <img src="Heart.png" />
        <img src="Heart.png" />
      `);
    } else if (this.actualScore === 5) {
      this.health.innerHTML = (`
        <img src="Heart.png" />
        <img src="Heart.png" />
        <img src="Half-Health.png" />
      `); 
    } else if (this.actualScore === 4) {
      this.health.innerHTML = (`
        <img src="Heart.png" />
        <img src="Heart.png" />
      `); 
    } else if (this.actualScore === 3) {
      this.health.innerHTML = (`
        <img src="Heart.png" />
        <img src="Half-Health.png" />
      `); 
    } else if (this.actualScore === 2) {
      this.health.innerHTML = (`
        <img src="Heart.png" />
      `); 
    } else if (this.actualScore === 1) {
      this.health.innerHTML = (`
        <img src="Half-Health.png" />
      `); 
    } else if (this.actualScore === 0) {
      this.health.innerHTML = (``); 
    }
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
      <img src="Half-Health.png" />
    `);
  }
  
  init(container) {
    this.createElements();
    container.appendChild(this.score);
    container.appendChild(this.health);
  }
}
