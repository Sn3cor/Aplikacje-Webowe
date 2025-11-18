import { Pipe } from "./Pipe.js";

class Pipes {
    constructor(canvas) {
        this.canvas = canvas;
        this.pipes = []

        this.lastSpawn = 0;
        this.spawnInterval = 250;
    }

    update = () => {
        this.pipes.forEach(pipe => pipe.update());
        this.pipes = this.pipes.filter(pipe => !pipe.isOffScreen());

        this.lastSpawn += 2;
        if (this.lastSpawn > this.spawnInterval) {
            this.pipes.push(new Pipe(this.canvas.width, this.canvas.height));
            this.lastSpawn = 0;
        }

    }

    drawPipes = (ctx) => {
        this.pipes.forEach(pipe => pipe.drawPipe(ctx));
    }

    checkCollisions = (bird) => {
        return this.pipes.some(pipe => pipe.collides(bird));
    }

}

export { Pipes }