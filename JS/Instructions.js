class Instructions {
  constructor() {
    this.element = null;
  }
  
  createElement() {
    this.musicElement = document.createElement("audio");
    this.musicElement.setAttribute("src", "Title-Theme.wav");
    this.musicElement.volume = 0.2;
    this.musicElement.loop = false;
    this.musicElement.play()
    
    this.element = document.createElement("div");
    this.element.classList.add("Instructions");
    
    this.element.innerHTML = (`
      <p id="movement">Movement: Up, Down, Left Right</p>
      <p id="dash">Dash (Space)</p>
      <p id="attack">Attack (Enter)</p>
      <img id="W-Key" src="W-Key.png" />
      <img id="A-Key" src="A-Key.png" />
      <img id="S-Key" src="S-Key.png" />
      <img id="D-Key" src="D-Key.png" />
      <img id="Space" src="Space.png" />
      <img id="Enter" src="Enter.png" />
      <p id="instructions">Destroy the holes and attack the enemies!</p>
    `);
  }
  
  init(container, resolve) {
    this.createElement();
    
    container.appendChild(this.element);
    
    /*setTimeout(() => {
      this.element.remove();
      this.musicElement.volume = 0;
      resolve();
    }, 6000)*/
  }
}
