import { Bird } from "./Bird.js"
import { Pipes } from "./Pipes.js"

class Map {
    constructor(context, canvas) {
        this.ctx = context;
        this.canvas = canvas;

        this.groundImg = new Image();
        this.groundImg.src = "./assets/Flappy Bird/base.png";
        this.groundOffset = 0
        this.groundSpeed = 1

        this.bird = new Bird(this.canvas.width / 7, this.canvas.height / 3);
        this.pipes = new Pipes(this.canvas)
    }

    init = () => {
        document.addEventListener("keydown", this.bird.jump)
        document.dispatchEvent(new KeyboardEvent("keydown", { code: "Space" }))
    }

    drawGround = () => {
        const img = this.groundImg;

        this.groundOffset -= this.groundSpeed;

        if (this.groundOffset <= -576) {
            this.groundOffset = 0;
        }
        this.ctx.drawImage(img, this.groundOffset, 720, 576, 192);
        this.ctx.drawImage(img, this.groundOffset + 576, 720, 576, 192)

    }

    updateCanvas = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.bird.makeFall();


        this.pipes.update();
        this.pipes.drawPipes(this.ctx);
        this.bird.drawBird(this.ctx);
        this.drawGround();
    }

    checkPipeCollision = () => {
        return this.pipes.checkCollisions(this.bird)
    }

    checkIfScored = () => {
        return this.pipes.checkIfPointIsScored(this.bird);
    }
}

export { Map }