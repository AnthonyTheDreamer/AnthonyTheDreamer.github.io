new Vue({
  el: '#app',
  data: {
    canvas: null,
    ctx: null,
    paddleX: null,
    paddleY: null,
    paddleHeight: 82,
    paddleWidth: 40,
    rightPressed: false,
    leftPressed: false,
    upPressed: false,
    downPressed: false,
    enemyTotal: 18,
    enemies: [],
    enemy_x: Math.floor(Math.random() * (1280 + 1) + 0),
    enemy_y: -50,
    enemy_w: 50,
    enemy_h: 50,
    speed: 5,
    n: 0,
    starX: 0,
    starY: 0,
    starY2: -720,
    gameStarted: false,
    score: 0,
    lives: 4,
    alive: true,
    invicible: false,
    paddleTotalFrames: 8,
    paddleCurrentFrame: 0,
    paddleShift: 0,
    enemyTotalFrames: 6,
    enemyCurrentFrame: 0,
    enemyShift: 0,
    laserTotal: 9,
    lasers: [],
    enemy: null,
    paddle: null,
    barrier: null,
    marisa: null,
    starfield: null
  },
  mounted() {
    this.canvas = this.$refs.myCanvas;
    this.ctx = this.canvas.getContext("2d");
    this.paddleX = (this.canvas.width-this.paddleWidth)/2;
    this.paddleY = this.canvas.height-this.paddleHeight;
    this.enemy = new Image();
    this.enemy.src = 'img/fairy.png';
    this.paddle = new Image();
    this.paddle.src = 'img/marisa.png';
    this.laser = new Image();
    this.laser.src = 'img/bullet.png'
    this.barrier = new Image();
    this.barrier.src = 'img/barrier.png'
    this.marisa = new Image();
    this.marisa.src = 'img/marisa2.png'
    this.starfield = new Image();
    this.starfield.src = 'img/background2.png';
    document.addEventListener("keydown", this.keyDownHandler, false);
    document.addEventListener("keyup", this.keyUpHandler, false);
    document.addEventListener('keydown', this.gameStart, false);
    setInterval(this.draw, 24);
  },
  methods: {
    resizeCanvas: function() {
      this.canvas.style.width = window.innerWidth + "px";
      this.canvas.style.height = window.innerHeight + "px";
    },
    drawScore: function() {
      this.ctx.font = "15px PressStart";
      this.ctx.fillStyle = "white";
      this.ctx.fillText("Score: "+this.score, 10, 20);
      if (!this.gameStarted) {
        this.ctx.drawImage(this.marisa,this.paddleX-(1159/2),this.paddleY-600);
        this.ctx.font = '40px PressStart';
        this.ctx.fillText('Marisa Scroll Shooter', this.canvas.width / 2 - 400, this.canvas.height / 2);
        this.ctx.font = '20px PressStart';
        this.ctx.fillText('Press Enter to play', this.canvas.width / 2 - 175, this.canvas.height / 2 + 40);
        this.ctx.fillText('Use Arrow Keys to move', this.canvas.width / 2 - 200, this.canvas.height / 2 + 80);
        this.ctx.fillText('Use the Z key to shoot', this.canvas.width / 2 - 200, this.canvas.height / 2 + 120);
      }
      if (!this.alive) {
        this.ctx.font = "20px PressStart";
        this.ctx.fillText('Game Over!', this.canvas.width/2-80, this.canvas.height / 2);
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('Press Enter to play again!', this.canvas.width/2-250, (this.canvas.height / 2) + 40);
        document.addEventListener('keydown', this.continueButton, false);
      }
    },
    drawEnemy: function() {
      setTimeout(()=> {
        this.enemies.push([this.enemy_x, this.enemy_y, this.enemy_w, this.enemy_h, this.speed]);
        this.enemy_x = Math.floor(Math.random() * (1280 + 1) + 0);
        this.n++;
        if (this.n < 18) {
          this.drawEnemy();
        }
      }, 500)
    },
    gameStart: function(e) {
      if (e.keyCode == 13) {
        this.gameStarted = true;
        this.$refs.ok.play();
        this.$refs.background.pause();
        this.$refs.background.currentTime=0;
        this.$refs.game.play();
        this.drawEnemy();
        document.removeEventListener('keydown', this.gameStart, false);
      }
    },
    drawLives: function() {
      this.ctx.font = "15px PressStart";
      this.ctx.fillStyle = "white";
      this.ctx.fillText("Barriers: "+(this.lives-1), this.canvas.width-180, 20);
    },
    drawStarfield: function() {
      this.ctx.drawImage(this.starfield,this.starX,this.starY);
      this.ctx.drawImage(this.starfield,this.starX,this.starY2);
      if (this.starY > 720) {
        this.starY = -719;
      }
      if (this.starY2 > 720) {
        this.starY2 = -719;
      }
      this.starY += 1;
      this.starY2 += 1;
    },
    keyDownHandler: function(e) {
      if (e.keyCode == 39) {
        this.rightPressed = true;    
      } 
      else if (e.keyCode == 37) {
        this.leftPressed = true;
      }
      if (e.keyCode == 38) {
        this.upPressed = true;
      }
      else if (e.keyCode == 40) {
        this.downPressed = true;
      }
      if (e.keyCode == 90 && this.lasers.length <= this.laserTotal) {
        this.$refs.laser.volume=0.2;
        this.$refs.laser.pause();
        this.$refs.laser.currentTime=0;
        this.$refs.laser.play();
        this.lasers.push([this.paddleX + 14, this.paddleY -10, 8, 17]);
      }
    },
    keyUpHandler: function(e) {
      if (e.keyCode == 39) {
        this.rightPressed = false;
      }
      else if (e.keyCode == 37) {
        this.leftPressed = false;
      }
      if (e.keyCode == 38) {
        this.upPressed = false;
      }
      else if (e.keyCode == 40) {
        this.downPressed = false;
      }
    },
    updatePaddleFrame: function() {
      this.paddleCurrentFrame = ++ this.paddleCurrentFrame % this.paddleTotalFrames;
      this.paddleShift = this.paddleCurrentFrame * 40;
    },
    drawPaddle: function() {
      this.updatePaddleFrame();
      if(this.rightPressed && this.paddleX < this.canvas.width-this.paddleWidth) {
        this.paddleX += 5;
      }
      else if(this.leftPressed && this.paddleX > 0) {
        this.paddleX -= 5;
      }
      if (this.upPressed && this.paddleY > 0) {
        this.paddleY -= 5;
      } 
      else if (this.downPressed && this.paddleY < this.canvas.height-this.paddleHeight) {
        this.paddleY += 5;
      }
      this.ctx.drawImage(this.paddle, this.paddleShift, 0, 40, 82, this.paddleX, this.paddleY, 40, 82);
    },
    updateEnemyFrame: function() {
      this.enemyCurrentFrame = ++ this.enemyCurrentFrame % this.enemyTotalFrames;
      this.enemyShift = this.enemyCurrentFrame * 50;
    },
    drawEnemies: function() {
      this.updateEnemyFrame();
      for (var i = 0; i < this.enemies.length; i++) {
        this.ctx.drawImage(this.enemy, this.enemyShift, 0, 50, 50, this.enemies[i][0], this.enemies[i][1], 50, 50);
      }
    },
    moveEnemies: function() {
      for (var i = 0; i < this.enemies.length; i++) {
        if (this.enemies[i][1] < this.canvas.height) {
          this.enemies[i][1] += this.enemies[i][4];
          if (this.enemies[i][0] < this.paddleX) {
            this.enemies[i][0] +=1;
          }
          if (this.enemies[i][0] > this.paddleX) {
            this.enemies[i][0] -=1;
          }
        } 
        else if (this.enemies[i][1] > this.canvas.height - 1) {
          this.enemies[i][1] = -50;
          this.enemies[i][0] = Math.floor(Math.random() * (1280 + 1) + 0)
        }
      }
    },
    drawLaser: function() {
      if (this.lasers.length)
        for (var i = 0; i < this.lasers.length; i++) {
          this.ctx.drawImage(this.laser, this.lasers[i][0], this.lasers[i][1]);
        }
    },
    moveLaser: function() {
      for (var i = 0; i < this.lasers.length; i++) {
        if (this.lasers[i][1] > -11) {
          this.lasers[i][1] -= 10;
        } 
        else if (this.lasers[i][1] < -10) {
          this.lasers.splice(i, 1);
        }
      }
    },
    hitTest: function() {
      var remove = false;
      for (var i = 0; i < this.lasers.length; i++) {
        for (var j = 0; j < this.enemies.length; j++) {
          if (this.lasers[i][1] <= (this.enemies[j][1] + this.enemies[j][3]) && this.lasers[i][0] >= this.enemies[j][0] && this.lasers[i][0] <= (this.enemies[j][0] + this.enemies[j][2])) {
            this.$refs.hit.volume=0.5;
            this.$refs.hit.pause();
            this.$refs.hit.currentTime=0;
            this.$refs.hit.play();
            remove = true;
            this.score += 10;
            this.enemies.splice(j, 1);
            this.enemies.push([Math.floor(Math.random() * (1280 + 1) + 0), -50, this.enemy_w, this.enemy_h, this.speed]);
          }
        }
        if (remove == true) {
          this.lasers.splice(i, 1);
          remove = false;
        }
      }
    },
    paddleCollision: function() {
      var paddleXW = this.paddleX + this.paddleWidth,
          paddleYH = this.paddleY + this.paddleHeight;
      for (var i = 0; i < this.enemies.length; i++) {
        if (this.paddleX > this.enemies[i][0] && this.paddleX < this.enemies[i][0] + this.enemy_w && this.paddleY > this.enemies[i][1] && this.paddleY < this.enemies[i][1] + this.enemy_h) {
          this.invicible = true;
          this.checkLives();
        }
        if (paddleXW < this.enemies[i][0] + this.enemy_w && paddleXW > this.enemies[i][0] && this.paddleY > this.enemies[i][1] && this.paddleY < this.enemies[i][1] + this.enemy_h) {
          this.invicible = true;
          this.checkLives();
        }
        if (paddleYH > this.enemies[i][1] && paddleYH < this.enemies[i][1] + this.enemy_h && this.paddleX > this.enemies[i][0] && this.paddleX < this.enemies[i][0] + this.enemy_w) {
          this.invicible = true;
          this.checkLives();
        }
        if (paddleYH > this.enemies[i][1] && paddleYH < this.enemies[i][1] + this.enemy_h && this.paddleXW < this.enemies[i][0] + this.enemy_w && paddleXW > this.enemies[i][0]) {
          this.invicible = true;
          this.checkLives();
        }
      }
    },
    checkLives: function() {
        var myBarrier = setInterval(()=> {
          this.ctx.drawImage(this.barrier, this.paddleX-41, this.paddleY-41/2);
        },24);
        this.lives -= 1;
        if (this.lives > 0) {
            this.$refs.barrier.play();
            setTimeout(()=>{
              clearInterval(myBarrier);
              this.invicible = false;
            }, 3000);
        } else if (this.lives <= 0) {
            this.$refs.dead.play();
            this.alive = false;
            clearInterval(myBarrier);
        }
    },
    continueButton: function(e) {
      if (e.keyCode == 13) {
        this.$refs.game.pause();
        this.$refs.game.currentTime=0;
        this.$refs.game.play();
        this.alive = true;
        this.invicible = false;
        this.lives = 4;
        this.score = 0;
        this.n = 0;
        this.enemies = [];
        this.lasers = [];
        this.enemy_x = Math.floor(Math.random() * (1280 + 1) + 0);
        this.drawEnemy();
        for (var i = 0; i < this.enemies.length; i++) {
          this.enemies[i][1] = -50;
        }
        this.paddleHeight = 88, this.paddleWidth = 40, this.paddleX = (this.canvas.width-this.paddleWidth)/2, this.paddleY = this.canvas.height-this.paddleHeight;
        document.removeEventListener('keydown', this.continueButton, false);
      }
    },
    draw: function() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.resizeCanvas();
      this.drawStarfield();
      if (this.alive && this.gameStarted && this.lives > 0) {
        this.hitTest();
        this. drawPaddle();
        this.drawEnemies();
        this.moveEnemies();
        this.moveLaser();
        this.drawLaser();
        this.drawLives();
      }
      if (this.alive && this.gameStarted && this.lives > 0 && !this.invicible) {
        this.paddleCollision();
      }
      this.drawScore();
    }
  }
});