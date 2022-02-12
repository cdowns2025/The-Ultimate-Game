class Player {// the player class global attributes
    constructor(x, y, width, height, src) {
        this.x = x;
        this.y = y;
        this.cx = Math.floor(this.x / globalRatio);
        this.cy = Math.floor(this.y / globalRatio);
        this.width = width;
        this.height = height;
        this.src = src;
        this.dir = 1;
        this.vAxis = 0;
        this.hAxis = 0;
    }
    move() {

    }
    draw(ctx) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

    

    let keysDown = {};

    //player dimensions and attributes proportional to screen
    player.width = globalRatio;
    player.height = globalRatio;
    player.speed = globalRatio / 20;
    player.y = globalRatio * 5 - player.height / 2;

    //inputs
    document.addEventListener('keydown', function(event) {
        keysDown[event.key] = true;
    });

    document.addEventListener('keyup', function(event) {
        delete keysDown[event.key];
    });

    function input() {
        if ("w" in keysDown) {
            player.y -= player.speed; //temporary form of movement for testing, I'll set variables such as the player's direction and the vertical and horizantal axes to allow player to move more cell-based
        }
        if ("s" in keysDown) {
            player.y += player.speed;
        }
        if ("d" in keysDown) {
            player.x += player.speed;
        }
        if ("a" in keysDown) {
            player.x -= player.speed;
        }
    }
    