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

var paddleHeight = 82;
var paddleWidth = 40;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleY = canvas.height-paddleHeight;

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

var enemyTotal = 18,
    enemies = [],
    enemy_x = Math.floor(Math.random() * (1280 + 1) + 0),
    enemy_y = -50,
    enemy_w = 50,
    enemy_h = 50,
    speed = 5;
// for (var i = 0; i < enemyTotal; i++) {
//   enemies.push([enemy_x, enemy_y, enemy_w, enemy_h, speed]);
//   enemy_x += enemy_w + 20;
// }

var n = 0;
function drawEnemy() {           
  setTimeout(function () {
    enemies.push([enemy_x, enemy_y, enemy_w, enemy_h, speed]);
    enemy_x = Math.floor(Math.random() * (1280 + 1) + 0);
    n++;
    if (n < 18) {
      drawEnemy();
    }
  }, 500)
}

var enemy,
    paddle,
    barrier,
    marisa;

enemy = new Image();
enemy.src = 'img/fairy.png';
paddle = new Image();
paddle.src = 'img/marisa.png';
laser = new Image();
laser.src = 'img/bullet.png'
barrier = new Image();
barrier.src = 'img/barrier.png'
marisa = new Image();
marisa.src = 'img/marisa2.png'

var laserTotal = 9,
    lasers = [];

var starfield,
    starX = 0,
    starY = 0,
    starY2 = -720;

starfield = new Image();
starfield.src = 'img/background2.png';

var gameStarted = false;
var score = 0;
var lives = 4;
var alive = true;
var invicible = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener('keydown', gameStart, false);

function gameStart(e) {
    if (e.keyCode == 13) {
        gameStarted = true;
        document.getElementById("ok").play();
        document.getElementById("background").pause();
        document.getElementById("background").currentTime=0;
        document.getElementById("game").play();
        drawEnemy();
        document.removeEventListener('keydown', gameStart, false);
    }
}

function drawScore() {
    ctx.font = "15px PressStart";
    ctx.fillStyle = "white";
    ctx.fillText("Score: "+score, 10, 20);
    if (!gameStarted) {
      ctx.drawImage(marisa,paddleX-(1159/2),paddleY-600);
      ctx.font = '40px PressStart';
      ctx.fillText('Marisa Scroll Shooter', canvas.width / 2 - 400, canvas.height / 2);
      ctx.font = '20px PressStart';
      ctx.fillText('Press Enter to play', canvas.width / 2 - 175, canvas.height / 2 + 40);
      ctx.fillText('Use Arrow Keys to move', canvas.width / 2 - 200, canvas.height / 2 + 80);
      ctx.fillText('Use the Z key to shoot', canvas.width / 2 - 200, canvas.height / 2 + 120);
    }
    if (!alive) {
        ctx.font = "20px PressStart";
        ctx.fillText('Game Over!', canvas.width/2-80, canvas.height / 2);
        // ctx.fillRect((canvas.width / 2) - 53, (canvas.height / 2) + 10,100,40);
        ctx.fillStyle = 'white';
        ctx.fillText('Press Enter to play again!', canvas.width/2-250, (canvas.height / 2) + 40);
        document.addEventListener('keydown', continueButton, false);
    }
}

function drawLives() {
    ctx.font = "15px PressStart";
    ctx.fillStyle = "white";
    ctx.fillText("Barriers: "+(lives-1), canvas.width-180, 20);
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;    
    } 
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
    if (e.keyCode == 38) {
        upPressed = true;
    }
    else if (e.keyCode == 40) {
        downPressed = true;
    }
    if (e.keyCode == 90 && lasers.length <= laserTotal) {
        document.getElementById("laser").volume=0.2;
        document.getElementById("laser").pause();
        document.getElementById("laser").currentTime=0;
        document.getElementById("laser").play();
        lasers.push([paddleX + 14, paddleY -10, 8, 17]);
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
    if (e.keyCode == 38) {
        upPressed = false;
    }
    else if (e.keyCode == 40) {
        downPressed = false;
    }
}

function drawStarfield() {
  ctx.drawImage(starfield,starX,starY);
  ctx.drawImage(starfield,starX,starY2);
  if (starY > 720) {
    starY = -719;
  }
  if (starY2 > 720) {
    starY2 = -719;
  }
  starY += 1;
  starY2 += 1;
}

var paddleTotalFrames = 8;
var paddleCurrentFrame = 0;
var paddleShift = 0;

function updatePaddleFrame() {
  paddleCurrentFrame = ++ paddleCurrentFrame % paddleTotalFrames;
  paddleShift = paddleCurrentFrame * 40;
}

function drawPaddle() {
    updatePaddleFrame();
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 5;
        // ctx.drawImage(paddleright, paddleX, paddleY);
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 5;
        // ctx.drawImage(paddleleft, paddleX, paddleY);
    }
    if (upPressed && paddleY > 0) {
        paddleY -= 5;
    } 
    else if (downPressed && paddleY < canvas.height-paddleHeight) {
        paddleY += 5;
    } 
    // ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    // ctx.fillStyle = "white";
    ctx.drawImage(paddle, paddleShift, 0, 40, 82, paddleX, paddleY, 40, 82);
}

var enemyTotalFrames = 6;
var enemyCurrentFrame = 0;
var enemyShift = 0;

function updateEnemyFrame() {
  enemyCurrentFrame = ++ enemyCurrentFrame % enemyTotalFrames;
  enemyShift = enemyCurrentFrame * 50;
}

function drawEnemies() {
    updateEnemyFrame();
    for (var i = 0; i < enemies.length; i++) {
        ctx.drawImage(enemy, enemyShift, 0, 50, 50, enemies[i][0], enemies[i][1], 50, 50);
    }
}

function moveEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    if (enemies[i][1] < canvas.height) {

      enemies[i][1] += enemies[i][4];
      if (enemies[i][0] < paddleX) {
        enemies[i][0] +=1;
      }
      if (enemies[i][0] > paddleX) {
        enemies[i][0] -=1;
      }
    } else if (enemies[i][1] > canvas.height - 1) {
      enemies[i][1] = -50;
      enemies[i][0] = Math.floor(Math.random() * (1280 + 1) + 0)
    }
  }
}

function drawLaser() {
  if (lasers.length)
    for (var i = 0; i < lasers.length; i++) {
      ctx.drawImage(laser, lasers[i][0] ,lasers[i][1]);
    }
}

function moveLaser() {
  for (var i = 0; i < lasers.length; i++) {
    if (lasers[i][1] > -11) {
      lasers[i][1] -= 10;
    } else if (lasers[i][1] < -10) {
      lasers.splice(i, 1);
    }
  }
}

function hitTest() {
  var remove = false;
  for (var i = 0; i < lasers.length; i++) {
    for (var j = 0; j < enemies.length; j++) {
      if (lasers[i][1] <= (enemies[j][1] + enemies[j][3]) && lasers[i][0] >= enemies[j][0] && lasers[i][0] <= (enemies[j][0] + enemies[j][2])) {
        document.getElementById("hit").volume=0.5;
        document.getElementById("hit").pause();
        document.getElementById("hit").currentTime=0;
        document.getElementById("hit").play();
        remove = true;
        score += 10;
        enemies.splice(j, 1);
        enemies.push([Math.floor(Math.random() * (1280 + 1) + 0), -50, enemy_w, enemy_h, speed]);
      }
    }
    if (remove == true) {
      lasers.splice(i, 1);
      remove = false;
    }
  }
}

function paddleCollision() {
  var paddleXW = paddleX + paddleWidth,
      paddleYH = paddleY + paddleHeight;
  for (var i = 0; i < enemies.length; i++) {
    if (paddleX > enemies[i][0] && paddleX < enemies[i][0] + enemy_w && paddleY > enemies[i][1] && paddleY < enemies[i][1] + enemy_h) {
      invicible = true;
        checkLives();
    }
    if (paddleXW < enemies[i][0] + enemy_w && paddleXW > enemies[i][0] && paddleY > enemies[i][1] && paddleY < enemies[i][1] + enemy_h) {
      invicible = true;
        checkLives();
    }
    if (paddleYH > enemies[i][1] && paddleYH < enemies[i][1] + enemy_h && paddleX > enemies[i][0] && paddleX < enemies[i][0] + enemy_w) {
      invicible = true;
        checkLives();
    }
    if (paddleYH > enemies[i][1] && paddleYH < enemies[i][1] + enemy_h && paddleXW < enemies[i][0] + enemy_w && paddleXW > enemies[i][0]) {
      invicible = true;
        checkLives();
    }
  }
}

function checkLives() {
    var myBarrier = setInterval(function() {
      ctx.drawImage(barrier, paddleX-41, paddleY-41/2);
    },24);
    lives -= 1;
    if (lives > 0) {
        document.getElementById("barrier").play();
        setTimeout(function(){
          clearInterval(myBarrier);
          invicible = false;
        }, 3000);
        // paddleHeight = 88, paddleWidth = 40, paddleX = (canvas.width-paddleWidth)/2, paddleY = canvas.height-paddleHeight;
    } else if (lives <= 0) {
        document.getElementById("dead").play();
        alive = false;
        clearInterval(myBarrier);
    }
}

function continueButton(e) {
    if (e.keyCode == 13) {
        document.getElementById("game").pause();
        document.getElementById("game").currentTime=0;
        document.getElementById("game").play();
        alive = true;
        invicible = false;
        lives = 4;
        score = 0;
        n = 0;
        enemies = [];
        lasers = [];
        enemy_x = Math.floor(Math.random() * (1280 + 1) + 0);
        drawEnemy();
        for (var i = 0; i < enemies.length; i++) {
          enemies[i][1] = -50;
        }

        paddleHeight = 88, paddleWidth = 40, paddleX = (canvas.width-paddleWidth)/2, paddleY = canvas.height-paddleHeight;
        document.removeEventListener('keydown', continueButton, false);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStarfield()
    if (alive && gameStarted && lives > 0) {
        hitTest();
        // paddleCollision();
        drawPaddle();
        drawEnemies();
        moveEnemies();
        moveLaser();
        drawLaser();
        drawLives();
    }
    if (alive && gameStarted && lives > 0 && !invicible) {
      // hitTest();
      paddleCollision();
      // drawPaddle();
      // drawEnemies();
      // moveEnemies();
      // moveLaser();
      // drawLaser();
      // drawLives();
    }
    drawScore();
}

setInterval(draw, 24);