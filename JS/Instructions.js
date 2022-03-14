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
      <img id="Up-Arrow" src="Up-Arrow.png" />
      <img id="Right-Arrow" src="Right-Arrow.png" />
      <img id="Down-Arrow" src="Down-Arrow.png" />
      <img id="Left-Arrow" src="Left-Arrow.png" />
      <img id="Space" src="Space.png" />
      <img id="Enter" src="Enter.png" />
    `);
  }
  
  init(container, resolve) {
    this.createElement();
    
    container.appendChild(this.element);
  }
}
