class Key {
    constructor (code) {
        this.down = false;
        this.press = false;
        this.code = code;
    }
    keyCheck() {
        document.addEventListener('keypress', function(event) {
            if (event.code == this.code) {
                this.press = true;
            } else if (event.code !== this.code) {
                this.press = false;
            }
        });
        document.addEventListener('keydown', function(event) {
            if (event.code == this.code) {
                this.down = true;
            }
        });
        document.addEventListener('keyup', function(event) {
            if (event.code == this.code) {
                this.down = false;
            }
        });
    }
}

class Input {
    constructor() {
        this.w = new Key("KeyW");
        this.a = new Key("KeyA");
        this.s = new Key("KeyS");
        this.d = new Key("KeyD");
        this.enter = new Key("Enter");
        this.space = new Key("Space");
        this.plus = new Key("Equal");
    }
}