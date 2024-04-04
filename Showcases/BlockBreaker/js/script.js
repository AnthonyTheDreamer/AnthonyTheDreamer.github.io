var canvas = document.getElementById("myCanvas");

function resizeCanvas() {
	canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
};

// Webkit/Blink will fire this on load, but Gecko doesn't.
window.onresize = resizeCanvas;

// So we fire it manually...
resizeCanvas();

var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height-30;
// var myArray = [-2, 2];

var dx = [-3, 3][Math.floor(Math.random()*[-3, 3].length)];
var dy = -3;

var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 150;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;

var brickRowCount = 5;
var brickColumnCount = 12;
var brickWidth = 75;
var brickHeight = 25;
var brickPadding = 25;
var brickOffsetTop = 30;
var brickOffsetLeft = 52.5;
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
var colors = ['rgb(255,0,0)','rgb(0,255,0)','rgb(0,0,255)','rgb(255,255,0)']
var score = 0;
var lives = 3;
var gameIsRunning = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// document.addEventListener("mousemove", mouseMoveHandler, false);

function drawScore() {
    ctx.font = "15px PressStart";
    ctx.fillStyle = "#white";
    ctx.fillText("Score: "+score, 10, 20);
}

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#white";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
           	if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                	if (dy > 0) {
                		dy += 0.1;
                	}
                	if (dy <0) {
                		dy -= 0.1;
                	}
                	document.getElementById("brick").pause();
                	document.getElementById("brick").currentTime=0;
                	document.getElementById("brick").play();
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN!\n\n Your score: " + score + "\n Your lives: " + lives);
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "15px PressStart";
    ctx.fillStyle = "#white";
    ctx.fillText("Score: "+score, 10, 20);
}

// function mouseMoveHandler(e) {
//     var relativeX = e.clientX - canvas.offsetLeft;
//     if(relativeX > 0 && relativeX < canvas.width) {
//         paddleX = relativeX - paddleWidth/2;
//     }
// }

function drawLives() {
    ctx.font = "15px PressStart";
    ctx.fillStyle = "#white";
    ctx.fillText("Lives: "+lives, canvas.width-130, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    drawLives();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    	if (dx > 0) {
                		dx += 0.1;
                	}
                	if (dy <0) {
                		dx -= 0.1;
                	}
	    dx = -dx;
	    document.getElementById("wall").pause();
        document.getElementById("wall").currentTime=0;
        document.getElementById("wall").play();
	}
	if(y + dy < ballRadius) {
		document.getElementById("wall").pause();
        document.getElementById("wall").currentTime=0;
        document.getElementById("wall").play();
        if (dy > 0) {
                		dy += 0.1;
                	}
                	if (dy <0) {
                		dy -= 0.1;
                	}
	    dy = -dy;
	} else if(y + dy > canvas.height-ballRadius) {
	    if(x > paddleX && x < paddleX + paddleWidth) {
	    	document.getElementById("wall").pause();
            document.getElementById("wall").currentTime=0;
            document.getElementById("wall").play();
            if (dy > 0) {
                		dy += 0.1;
                	}
                	if (dy <0) {
                		dy -= 0.1;
                	}
	        dy = -dy;
	    }
	    else {
	        lives--;
			if(!lives) {
			    alert("GAME OVER! YOU LOSE!\n\nYour score: "+score);
			    document.location.reload();
			}
			else {
				document.getElementById("death").play();
			    x = canvas.width/2;
			    y = canvas.height-30;
			    dx = dx = [-3, 3][Math.floor(Math.random()*[-3, 3].length)];
			    dy = -3;
			    // paddleX = (canvas.width-paddleWidth)/2;
			}
	    }
	}
	if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    x += dx;
    y += dy;

}

setInterval(draw, 10);