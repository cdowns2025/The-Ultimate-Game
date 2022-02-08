const player = {// the player's global attributes
    x: 300,
    y: 300,
    width: 30,
    height: 30,
    speed: 5,
    health: 3
}

window.addEventListener('load', () => {//calling the rest of the code when the page loads
    const canvas = document.getElementById('canvas');//sets up the canvas
    const ctx = canvas.getContext('2d');

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

    function draw() {
        if (GAME_STATES.ACTIVE == true) {
            ctx.fillStyle = 'blue';
            ctx.fillRect((canvas.width / 2) - (player.width / 2), player.y, player.width, player.height);
        }
    }
    
    function main() {
        draw();
        input();
        requestAnimationFrame(main);
    }
    main();
});
