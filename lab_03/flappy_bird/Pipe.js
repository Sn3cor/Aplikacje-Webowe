class Pipe {
    constructor(x, canvasHeight) {
        this.x = x;
        this.gap = 160;
        this.speed = 2;

        this.topHeight = Math.floor(Math.random() * (canvasHeight - this.gap - 200)) + 20;
        this.botY = this.topHeight + this.gap;

        this.topImg = new Image();
        this.topImg.src = "./assets/Flappy Bird/pipe-green-top.png";

        this.botImg = new Image();
        this.botImg.src = "./assets/Flappy Bird/pipe-green-bottom.png";

        this.pipeHeight = 600;
        this.width = 80;
    }

    update = () => {
        this.x -= this.speed;
    }

    drawPipe = (ctx) => {
        ctx.drawImage(this.topImg, this.x, this.topHeight - this.pipeHeight, this.width, this.pipeHeight);
        ctx.drawImage(this.botImg, this.x, this.botY, this.width, this.pipeHeight);
    }

    collides = (bird) => {
        const birdLeft = bird.x;
        const birdRight = bird.x + 48;
        const birdTop = bird.y;
        const birdBottom = bird.y + 36;

        const pipeLeft = this.x;
        const pipeRight = this.x + this.width;

        const topPipeBottom = this.topHeight;
        const topPipeTop = this.topHeight - this.pipeHeight;

        const bottomPipeTop = this.botY;
        const bottomPipeBottom = this.botY + this.pipeHeight;

        const hitTop = birdRight > pipeLeft && birdLeft < pipeRight && birdTop < topPipeBottom && birdBottom > topPipeTop;
        const hitBottom = birdRight > pipeLeft && birdLeft < pipeRight && birdTop < bottomPipeBottom && birdBottom > bottomPipeTop;

        return hitTop || hitBottom;
    }

    isOffScreen = () => {
        return this.x + this.width < 0;
    }

    checkIfBirdPassed = (bird) => {
        const center = this.x + this.width / 2;

        if (!this.passed && bird.x > center) {
            this.passed = true;
            return true;
        }

        return false;
    }
}

export { Pipe }
