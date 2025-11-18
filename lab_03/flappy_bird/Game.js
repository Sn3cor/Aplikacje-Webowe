import { Map } from "./Map.js";

class Game {
    constructor(context, canvas) {
        this.canvas = canvas
        this.ctx = context;

        this.score = 0;
        this.map = new Map(this.ctx, this.canvas);

        this.fps = 120;
        this.interval = 1000 / this.fps;
        this.last = 0;

        this.numberImgs = [];

        for (let i = 0; i < 10; i++) {
            const img = new Image();
            img.src = `./assets/UI/Numbers/${i}.png`;
            this.numberImgs.push(img);

        }
    }

    startHandler = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        requestAnimationFrame(this.animate);

        this.canvas.removeEventListener("click", this.startHandler);
        this.map.init();
    }

    resetHandler = () => {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.map = new Map(this.ctx, this.canvas);
        requestAnimationFrame(this.animate);

        this.canvas.removeEventListener("click", this.resetHandler);
        this.map.init();
    }

    init = () => {

        const startImage = new Image();
        startImage.src = "./assets/UI/message.png";
        startImage.onload = () => {
            this.ctx.drawImage(startImage, 100, 100, this.canvas.width / 1.5, this.canvas.height / 1.5);
        };

        this.canvas.addEventListener("click", this.startHandler);
    }

    parseScore = () => {
        return String(this.score)
            .split("")
            .map(d => this.numberImgs[d]);
    }

    drawScore = (imgs) => {
        const startX = this.canvas.width / 1.2 - (imgs.length * 24) / 2;
        const y = 50;

        imgs.forEach((img, i) => {
            this.ctx.drawImage(img, startX + i * 24, y, 24, 36);
        });
    }

    gameOver = () => {
        document.removeEventListener("keydown", this.map.bird.jump);
        this.canvas.addEventListener("click", this.resetHandler)
        const hitAudio = new Audio("./assets/Sound Efects/hit.ogg");
        hitAudio.play();
    }

    animate = (timestamp) => {

        if (timestamp - this.last >= this.interval) {
            this.last = timestamp;
            this.map.updateCanvas();

            this.map.drawGround();

            const scoreImgs = this.parseScore();
            this.drawScore(scoreImgs);

            if (this.map.checkPipeCollision()) {
                this.gameOver();
                const fallAudio = new Audio("./assets/Sound Efects/die.ogg")
                fallAudio.play();
                return;
            }

            if (this.map.bird.detectGround()) {
                this.gameOver();
                return
            };

        }


        requestAnimationFrame(this.animate)
    }
}

export { Game }