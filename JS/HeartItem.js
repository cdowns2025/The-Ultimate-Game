//CLASS: Heart Item, an item the player can pick up or walk by and it will add to his health.

class HeartItem extends GameObject {
    constructor(config) {
        super(config);

        this.alive = true;
        this.collision = false;
    }

    update(state) {
        if (this.alive) {
            if (utils.gridFloor(state.player.x + 8) == this.x && utils.gridFloor(state.player.y + 8) == this.y) {
                if (state.player.health < 6) {
                    state.player.health++;
                }
                this.alive = false;
                this.isRendered = false;
            }
        }
    }
}