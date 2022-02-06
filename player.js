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
        keysDown[event.keyCode] = true;
    });

    document.addEventListener('keyup', function(event) {
        delete keysDown[event.keyCode];
    });

    function input() {
        if (87 in keysDown) {
            player.y = player.y - player.speed;
        }
        if (83 in keysDown) {
            player.y = player.y + player.speed;
        }
        if (68 in keysDown) {
            player.x = player.x + player.speed;
        }
        if (65 in keysDown) {
            player.x = player.x - player.speed;
        }
    }

    function draw() {
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.x, player.y, player.width, player.height);
    }
    
    function main() {
        draw();
        input();
        requestAnimationFrame(main);
    }
    main();
});
