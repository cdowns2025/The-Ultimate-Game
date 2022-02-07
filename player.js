window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    //player variables

    let keysDown = {};

    const player = {
        x: 300,
        y: 300,
        width: 30,
        height: 30,
        speed: 1,
        health: 3
    }

    document.addEventListener('keydown', function(event) {
        keysDown[event.key] = true;
    });

    document.addEventListener('keyup', function(event) {
        delete keysDown[event.key];
    });

    function input() {
        if ("w" in keysDown) {
            player.y -= player.speed;
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
            ctx.fillRect(player.x, player.y, player.width, player.height);
        }
    }
    
    function main() {
        draw();
        input();
        requestAnimationFrame(main);
    }
    main();
});
