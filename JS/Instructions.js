class Instructions {
  constructor() {
    this.element = null;
  }
  
  createElement() {
    this.element = document.createElement("div");
    this.element.classList.add("Instructions");
    
    this.element.innerHTML = (`
      <h1>Keys</h1>
      <img id="W-Key" src="W-Key" />
      <img id="A-Key" src="A-Key" />
      <img id="S-Key" src="S-Key" />
      <img id="D-Key" src="D-Key" />
      <img id="Up-Arrow" src="Up-Arrow" />
      <img id="Right-Arrow" src="Right-Arrow" />
      <img id="Down-Arrow" src="Down-Arrow" />
      <img id="Left-Arrow" src="Left-Arrow" />
      <img id="Space" src="Space" />
      <img id="Enter" src="Enter" />
    `);
  }
  
  init(container, resolve) {
    this.createElement();
    
    container.appendChild(this.element);
  }
}
