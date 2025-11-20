import { Map } from "./Map.js";

class Game {
    constructor(context, canvas) {
        this.canvas = canvas
        this.ctx = context;

        this.score = 0;
        this.highScore = Number(localStorage.getItem("highscore")) || 0;

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
        this.score = 0;
    }

    init = () => {

        const startImage = new Image();
        startImage.src = "./assets/UI/message.png";
        startImage.onload = () => {
            this.ctx.drawImage(startImage, 100, 100, this.canvas.width / 1.5, this.canvas.height / 1.5);
        };

        this.canvas.addEventListener("click", this.startHandler);
    }

    parseScore = (score) => {
        return String(score)
            .split("")
            .map(d => this.numberImgs[d]);
    }

    drawScore = (imgs, state) => {
        if (state === "game") {
            const x = this.canvas.width / 1.2 - (imgs.length * 24) / 2;
            const y = 50;

            imgs.forEach((img, i) => {
                this.ctx.drawImage(img, x + i * 24, y, 24, 36);
            });
        }
        else if (state === "gameOver") {
            const x = this.canvas.width / 2 - (imgs.length * 18) / 2;
            const y = 400;

            imgs.forEach((img, i) => {
                this.ctx.drawImage(img, x + i * 18, y, 18, 27);
            });
        }
        else if (state === "gameOverBest") {
            const x = this.canvas.width / 2 - (imgs.length * 18) / 2;
            const y = 600;

            imgs.forEach((img, i) => {
                this.ctx.drawImage(img, x + i * 18, y, 18, 27);
            });
        }
    }

    gameOver = () => {
        this.ctx.font = "24px Arial";
        this.ctx.fillStyle = "#000";
        this.ctx.textAlign = "center";

        if (this.score > this.highScore) {
            this.highScore = this.score
            localStorage.setItem("highscore", this.highScore);

        }

        const gameOverImg = new Image();
        gameOverImg.src = "./assets/UI/gameover.png";
        gameOverImg.onload = () => {
            this.ctx.drawImage(
                gameOverImg,
                this.canvas.width / 2 - gameOverImg.width / 2,
                this.canvas.height / 4
            );

            const scoreImgs = this.parseScore(this.score);
            this.drawScore(scoreImgs, "gameOver");

            const highScoreImgs = this.parseScore(this.highScore);
            this.drawScore(highScoreImgs, "gameOverBest");

            this.ctx.fillText("SCORE", this.canvas.width / 2, 370);
            this.ctx.fillText("BEST", this.canvas.width / 2, 570);
        };


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

            if (this.map.checkIfScored()) {
                this.score++;
                const pointAudio = new Audio("./assets/Sound Efects/point.ogg");
                pointAudio.play();
            }

            const scoreImgs = this.parseScore(this.score);
            this.drawScore(scoreImgs, "game");

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