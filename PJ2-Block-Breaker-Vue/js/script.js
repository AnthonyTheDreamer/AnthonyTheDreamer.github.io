new Vue({
    el: '#app',
    data: {
        canvas: null,
        ctx: null,
        x: null,
        y: null,
        dx: [-3, 3][Math.floor(Math.random()*[-3, 3].length)],
        dy: -3,
        ballRadius: 10,
        paddleHeight: 10,
        paddleWidth: 150,
        paddleX: null,
        rightPressed: false,
        leftPressed: false,
        brickRowCount: 5,
        brickColumnCount: 12,
        brickWidth: 75,
        brickHeight: 25,
        brickPadding: 25,
        brickOffsetTop: 30,
        brickOffsetLeft: 52.5,
        bricks: [],

        colors: ['rgb(255,0,0)','rgb(0,255,0)','rgb(0,0,255)','rgb(255,255,0)'],
        score: 0,
        lives: 3
    },
    mounted() {
        this.canvas = this.$refs.myCanvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = this.canvas.width/2;
        this.y = this.canvas.height-30;
        this.paddleX = (this.canvas.width-this.paddleWidth)/2;
        document.addEventListener("keydown", this.keyDownHandler, false);
        document.addEventListener("keyup", this.keyUpHandler, false);
        // document.addEventListener("mousemove", this.mouseMoveHandler, false);
        for(var c=0; c< this.brickColumnCount; c++) {
            this.bricks[c] = [];
            for(var r=0; r< this.brickRowCount; r++) {
                this.bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        };
        setInterval(this.draw, 10);
    },
    methods: {
        resizeCanvas: function() {
            this.canvas.style.width = window.innerWidth + "px";
            this.canvas.style.height = window.innerHeight + "px";
        },
        drawScore: function() {
            this.ctx.font = "15px PressStart";
            this.ctx.fillStyle = "#white";
            this.ctx.fillText("Score: "+ this.score, 10, 20);
        },
        drawLives: function() {
            this.ctx.font = "15px PressStart";
            this.ctx.fillStyle = "#white";
            this.ctx.fillText("Lives: "+this.lives, this.canvas.width-130, 20);
        },
        drawBall: function() {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI*2);
            this.ctx.fillStyle = "white";
            this.ctx.fill();
            this.ctx.closePath();
        },
        drawPaddle: function() {
            this.ctx.beginPath();
            this.ctx.rect(this.paddleX, this.canvas.height-this.paddleHeight, this.paddleWidth, this.paddleHeight);
            this.ctx.fillStyle = "white";
            this.ctx.fill();
            this.ctx.closePath();
        },
        drawBricks: function() {
            for(var c=0; c<this.brickColumnCount; c++) {
                for(var r=0; r<this.brickRowCount; r++) {
                    if(this.bricks[c][r].status == 1) {
                        var brickX = (c*(this.brickWidth+this.brickPadding))+this.brickOffsetLeft;
                        var brickY = (r*(this.brickHeight+this.brickPadding))+this.brickOffsetTop;
                        this.bricks[c][r].x = brickX;
                        this.bricks[c][r].y = brickY;
                        this.ctx.beginPath();
                        this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
                        this.ctx.fillStyle = "#white";
                        this.ctx.fill();
                        this.ctx.closePath();
                    }
                }
            }
        },
        keyDownHandler: function(e) {
            if(e.keyCode == 39) {
                this.rightPressed = true;
            }
            else if(e.keyCode == 37) {
                this.leftPressed = true;
            }
        },
        keyUpHandler: function(e) {
            if(e.keyCode == 39) {
                this.rightPressed = false;
            }
            else if(e.keyCode == 37) {
                this.leftPressed = false;
            }
        },
        // mouseMoveHandler: function(e) {
        //     var relativeX = e.clientX - this.canvas.offsetLeft;
        //     if(relativeX > 0 && relativeX < this.canvas.width) {
        //         this.paddleX = relativeX - this.paddleWidth/2;
        //     }
        // },
        collisionDetection: function() {
            for(var c=0; c<this.brickColumnCount; c++) {
                for(var r=0; r<this.brickRowCount; r++) {
                    var b = this.bricks[c][r];
                    if(b.status == 1) {
                        if(this.x > b.x && this.x < b.x+this.brickWidth && this.y > b.y && this.y < b.y+this.brickHeight) {
                            if (this.dy > 0) {
                                this.dy += 0.1;
                            }
                            if (this.dy <0) {
                                this.dy -= 0.1;
                            }
                            this.playbrick();
                            this.dy = -this.dy;
                            b.status = 0;
                            this.score++;
                            if(this.score == this.brickRowCount*this.brickColumnCount) {
                                alert("YOU WIN!\n\n Your score: " + this.score + "\n Your lives: " + this.lives);
                                document.location.reload();
                            }
                        }
                    }
                }
            }
        },
        playwall: function() {
            this.$refs.wall.pause();
            this.$refs.wall.currentTime=0;
            this.$refs.wall.play();
        },
        playbrick: function() {
            this.$refs.brick.pause();
            this.$refs.brick.currentTime=0;
            this.$refs.brick.play();
        },
        playdeath: function() {
            this.$refs.death.play();
        },
        draw: function() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.resizeCanvas();
            this.drawScore();
            this.drawLives();
            this.drawBall();
            this.drawPaddle();
            this.drawBricks();
            this.collisionDetection();
            if(this.x + this.dx > this.canvas.width-this.ballRadius || this.x + this.dx < this.ballRadius) {
                if (this.dx > 0) {
                                this.dx += 0.1;
                            }
                            if (this.dy <0) {
                                this.dx -= 0.1;
                            }
                this.dx = -this.dx;
                this.playwall();
            }
            if(this.y + this.dy < this.ballRadius) {
                this.playwall();
                if (this.dy > 0) {
                                this.dy += 0.1;
                            }
                            if (this.dy <0) {
                                this.dy -= 0.1;
                            }
                this.dy = -this.dy;
            } else if(this.y + this.dy > this.canvas.height-this.ballRadius) {
                if(this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
                    this.playwall();
                    if (this.dy > 0) {
                                this.dy += 0.1;
                            }
                            if (this.dy <0) {
                                this.dy -= 0.1;
                            }
                    this.dy = -this.dy;
                }
                else {
                    this.lives--;
                    if(!this.lives) {
                        alert("GAME OVER! YOU LOSE!\n\nYour score: "+this.score);
                        document.location.reload();
                    }
                    else {
                        this.playdeath();
                        this.x = this.canvas.width/2;
                        this.y = this.canvas.height-30;
                        this.dx = this.dx = [-3, 3][Math.floor(Math.random()*[-3, 3].length)];
                        this.dy = -3;
                    }
                }
            }
            if(this.rightPressed && this.paddleX < this.canvas.width-this.paddleWidth) {
                this.paddleX += 7;
            }
            else if(this.leftPressed && this.paddleX > 0) {
                this.paddleX -= 7;
            }
            this.x += this.dx;
            this.y += this.dy;
        }
    }
});