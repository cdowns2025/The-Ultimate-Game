class KeyPressListener {
  constructor(keyCode, callback) {
    this.keyCode = keyCode;
    this.keyDown = false;
    
    this.keyDownFunction = event => {
      if (event.code === this.keyCode) {
        if (!this.keyDown) {
          this.keydown = true;
          callback();
        }
      }
    };
    
    this.keyUpFunction = event => {
      if (event.code === this.keyCode) {
        this.keyDown = false;
      }
    };
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
