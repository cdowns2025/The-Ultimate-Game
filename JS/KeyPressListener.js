class KeyPressListener {
  constructor(keyCode, callback) {
    this.keyCode = keyCode;
    this.keyDown = false;
    
    this.keyDownFunction = event => {
      if (!this.keydown) {
        if (event.code === this.keyCode) {
          this.keydown = true;
          this.onKeyDown();
        }
      }
    };
    
    this.keyUpFunction = event => {
      if (!this.keydown) {
        if (event.code === this.keyCode) {
          this.keyDown = true;
          this.onKeyDown();
        }
      }
    };
    
    this.keydown = false;
  }
  
  unbind() {
    document.removeEventListener("keydown", this.keyDownFunction);
    document.removeEventListener("keyup", this.keyUpFunction);
  }
  
  init() {
    document.addEventListener("keydown", this.keyDownFunction);
    document.addEventListener("keyup", this.keyUpFunction);
  }
}
