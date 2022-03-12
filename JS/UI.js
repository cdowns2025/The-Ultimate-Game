class UI {
  constructor(config) {
    this.game = config.game;
    this.actualScore = config.game.score;
    this.playerHealth = config.game.map.gameObjects.allies["player"].health;
    
    this.waveNumber = 0;
  }
  
  endGame(container) {
    this.score.remove();
    this.playerHealth.remove();
    
    this.endScreen = document.createElement("div");
    this.endScreen.classList.add("EndScreen");
    if (this.waveNumber === 1) {
      this.endScreen.innerHTML = (`
        <p>You survived ${this.waveNumber} round!</p>
        <p>Your final score was ${this.actualScore}!</p>
        <p>Insert another coin to player again!</p>
      `);
    } else {
      this.endScreen.innerHTML = (`
        <p>You survived ${this.waveNumber} rounds!</p>
        <p>Your final score was ${this.actualScore}!</p>
        <p>Insert another coin to player again!</p>
      `);
    }
  }
  
  newWave(waveNumber, container) {
    this.waveElement = document.createElement("div");
    this.waveElement.classList.add("Wave");
    
    this.waveElement.innerHTML = (`
      <h1>Wave ${waveNumber}</h1>
    `);
    this.waveNumber = waveNumber;
    
    container.appendChild(this.waveElement);
    
    setTimeout(() => {
      this.waveElement.remove();
    }, 1000)
  }
  
  update(game) {
    this.actualScore = game.score;
    this.playerHealth = game.map.gameObjects.allies["player"].health;
    
    this.score.innerHTML = (`
      <p>${this.actualScore}</p>
    `);
    
    if (this.playerHealth === 6) {
      this.health.innerHTML = (`
        <img src="full-heart.png" />
        <img src="full-heart.png" />
        <img src="full-heart.png" />
      `);
    } else if (this.playerHealth === 5) {
      this.health.innerHTML = (`
        <img src="full-heart.png" />
        <img src="full-heart.png" />
        <img src="half-heart.png" />
      `); 
    } else if (this.playerHealth === 4) {
      this.health.innerHTML = (`
        <img src="full-heart.png" />
        <img src="full-heart.png" />
        <img src="no-heart.png" />
      `); 
    } else if (this.playerHealth === 3) {
      this.health.innerHTML = (`
        <img src="full-heart.png" />
        <img src="half-heart.png" />
        <img src="no-heart.png" />
      `); 
    } else if (this.playerHealth === 2) {
      this.health.innerHTML = (`
        <img src="full-heart.png" />
        <img src="no-heart.png" />
        <img src="no-heart.png" />
      `); 
    } else if (this.playerHealth === 1) {
      this.health.innerHTML = (`
        <img src="half-heart.png" />
        <img src="no-heart.png" />
        <img src="no-heart.png" />
      `); 
    } else if (this.playerHealth === 0) {
      this.health.innerHTML = (`
        <img src="no-heart.png" />
        <img src="no-heart.png" />
        <img src="no-heart.png" />
      `); 
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
      <img src="Heart.png" />
    `);
  }
  
  init(container) {
    this.createElements();
    container.appendChild(this.score);
    container.appendChild(this.health);
    
    this.newWave(1, container);
  }
}
