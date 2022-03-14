class Instructions {
  constructor() {
    this.element = null;
  }
  
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Instructions");
    
    this.element.innerHTML = (`
      <p id="movement">Movement: Up, Down, Left Right</p>
      <p id="dash">Dash</p>
      <p id="attack">Attack</p>
      <img id="W-Key" src="W-Key.png" />
      <img id="A-Key" src="A-Key.png" />
      <img id="S-Key" src="S-Key.png" />
      <img id="D-Key" src="D-Key.png" />
      <img id="Space" src="Space.png" />
      <p id="space-description">Space</p>
      <img id="Enter" src="Enter.png" />
      <p id="enter-description">Enter</p>
    `);
  }
  
  init(container, resolve) {
    this.createElement();
    
    container.appendChild(this.element);
    
    setTimeout(() => {
      //this.element.remove();
      //resolve();
    }, 6000)
  }
}
