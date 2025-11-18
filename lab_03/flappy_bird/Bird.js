class Bird {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.fallSpeed = 0;
        this.rotation = 0;
        this.birdImg = new Image();
        this.wingFrames = [
            "./assets/Flappy Bird/yellowbird-midflap.png",
            "./assets/Flappy Bird/yellowbird-upflap.png",
            "./assets/Flappy Bird/yellowbird-downflap.png",
            "./assets/Flappy Bird/yellowbird-midflap.png"
        ]
        this.currentFrame = 0
        // this.birdImg.src = "./assets/Flappy Bird/yellowbird-midflap.png";
    }

    jump = (e) => {
        if (e.code === "Space") {
            this.fallSpeed = -8
            const windSound = new Audio("./assets/Sound Efects/wing.ogg")
            windSound.play();
        };
    }

    updateRotation = () => {
        const maxDown = Math.PI / 2;
        const maxUp = -Math.PI / 6;
        const rotationSpeed = 0.05;

        if (this.fallSpeed > 0) {
            this.rotation += rotationSpeed;
            if (this.rotation > maxDown) this.rotation = maxDown;
        } else if (this.fallSpeed < 0) {
            this.rotation = maxUp
        }
    }

    drawBird = (ctx) => {
        const img = this.birdImg;
        const width = 48;
        const height = 36;

        const centerX = this.x + width / 2;
        const centerY = this.y + height / 2;
        this.updateWing();
        this.updateRotation();


        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(this.rotation);
        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        ctx.restore();
    }

    updateWing = () => {
        this.birdImg.src = this.wingFrames[this.currentFrame];
        this.currentFrame++;
        this.currentFrame %= 5;
    }

    detectGround = () => {
        const ground = 684;
        return this.y >= ground;
    }


    makeFall = () => {
        const gravity = 0.4;
        const ground = 684;
        const top = 0;
        this.fallSpeed += gravity;
        this.y += this.fallSpeed;

        if (this.detectGround()) {
            this.y = ground;
            this.fallSpeed = 0;
            this.currentFrame = 0;
        }

        if (this.y < top) {
            this.y = top;
        }
    }
}

export { Bird }