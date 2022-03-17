class UI {
  constructor(config) {
    this.game = config.game;
    this.actualScore = config.game.score;
    this.playerHealth = config.game.map.gameObjects.allies["player"].health;
    
    this.waveNumber = 0;
    
    this.muted = false;
  }
  
  endGame(container) {
    this.score.remove();
    this.health.remove();
    this.volume.remove();
    
    this.endScreen = document.createElement("div");
    this.endScreen.classList.add("EndScreen");
    
    if (this.waveNumber === 1) {
      this.endScreen.innerHTML = (`
        <p>You didn't survive any rounds.</p>
        <p>Your final score was ${this.actualScore}!</p>
        <p>Insert another coin to play again!</p>
      `);
    } else if (this.waveNumber === 2) {
      this.endScreen.innerHTML = (`
        <p>You survived ${this.waveNumber - 1} round!</p>
        <p>Your final score was ${this.actualScore}!</p>
        <p>Insert another coin to play again!</p>
      `);
    } else {
      this.endScreen.innerHTML = (`
        <p>You survived ${this.waveNumber - 1} rounds!</p>
        <p>Your final score was ${this.actualScore}!</p>
        <p>Insert another coin to play again!</p>
      `);
    } 
    
    this.playAgain = document.createElement("div");
    this.playAgain.classList.add("Again");
    this.playAgain.innerHTML = (`
      <button>Play Again?</button>
    `);
    
    this.playAgain.addEventListener("click", () => {
      /*this.game.init();
      
      this.endScreen.remove();
      this.playAgain.remove();*/
      document.location.reload()
    });
    
    container.appendChild(this.endScreen);
    container.appendChild(this.playAgain);
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
    this.waveNumber = game.wave;
    
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
    
    this.volume = document.createElement("div");
    this.volume.classList.add("Volume");
    this.volume.innerHTML = (`
      <img src="Unmute.png" />
    `);
    
    this.volume.addEventListener("click", () => {
      console.log("click");
      if (this.muted) {
        this.game.muted = false;
        this.muted = false;
        this.volume.innerHTML = (`
          <img src="Unmute.png" />
        `);
      } else if (!this.muted) {
        this.game.muted = true;
        this.muted = true;
        this.volume.innerHTML = (`
          <img src="Mute.png" />
        `);
      }
    })
  }
  
  init(container) {
    this.createElements();
    container.appendChild(this.score);
    container.appendChild(this.health);
    container.appendChild(this.volume);
  }
}
