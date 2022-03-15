/* 
Class Name: Spawner
 
Description: A game class that will spawn new enemies into the game at regular intervals, maybe even being a hostile block in itself. 
Could possibly be blocked by a pile of wood?

Arguments: x position, y position, number of enemies it contains, frame intervals between spawning

Functions:

update(state) {
    would update intervals of time in which it would spawn enemies on it.
}
onInteract () {
    arbitrary function used when the player hits the spawner
}
*/

class Spawner extends GameObject {
    constructor(config) {
        super(config);
        this.enemyCapacity = config.enemyCapacity;
        this.collision = false;
        this.intervalTime = config.intervalTime;
        this.currentTime = 0;
        this.enemyCounter = 0;
        this.alive = true;
    }

    update(state) {
        console.log(state.deltaTime);
        if (this.alive) {
            if (this.currentTime > this.intervalTime) {
                this.currentTime -= this.intervalTime;
                if (this.enemyCounter < this.enemyCapacity) {
                    state.map.gameObjects.enemies["enemy" + (Object.values(state.map.gameObjects.enemies).length + 1)] = new Enemy({
                        x: this.x,
                        y: this.y,
                        color: "purple",
                    });
                    this.enemyCounter++;
                } else {
                    this.isRendered = false;
                }
            }
            this.currentTime += state.deltaTime;
        }
    }

    onInteracted(hitInfo) {
        this.alive = false;
        this.isRendered = false;
    }
}
