export class Game {

    constructor(arena, player, renderer) {
        this.arena = arena;
        this.player = player;
        this.renderer = renderer;

        this.lastTime = 0;
        this.dropCounter = 0;
        this.dropInterval = 1000;
    }

    update = (time = 0) => {

        const deltaTime = time - this.lastTime;
        this.lastTime = time;

        this.dropCounter += deltaTime;

        if (this.dropCounter > this.dropInterval) {
            this.player.drop();
            this.dropCounter = 0;
        }

        this.renderer.draw();

        requestAnimationFrame(this.update);
    }
}