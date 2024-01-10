let gameScene = new Phaser.Scene('Game');

gameScene.init = function() {
    this.playerSpeed = 4;

    this.enemyMinSpeed = 2;
    this.enemyMaxSpeed = 4;
    this.enemyMinY = 80;
    this.enemyMaxY = 280;

    this.isTerminating = false;
};

gameScene.preload = function () {
    this.load.image('background', 'img/background.png');
    this.load.image('player', 'img/player.png');
    this.load.image('enemy', 'img/dragon.png');
    this.load.image('goal', 'img/treasure.png');
};

gameScene.create = function () {
    let background = this.add.sprite(0, 0, 'background');
    background.setOrigin(0, 0);
    // background.setPosition(this.sys.game.config.width / 2, this.sys.game.config.height / 2);

    this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');
    this.player.setScale(0.5);

    this.enemies = this.add.group({
        key: 'enemy',
        repeat: 4,
        setXY: {
            x: 90,
            y: this.sys.game.config.height / 2,
            stepX: 100,
            stepY: 20
        }
    });

    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4);

    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
        enemy.flipX = true;

        let dir = Math.random() < 0.5 ? 1 : -1;
        let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
        enemy.speed = dir * speed;
    }, this);

    this.goal = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'goal');
    this.goal.setScale(0.5);
};

gameScene.update = function () {
    if (this.isTerminating) {
        return;
    }

    if (this.input.activePointer.isDown) {
        this.player.x += this.playerSpeed;
    }

    let playerRect = this.player.getBounds();
    let treasureRect = this.goal.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
        console.log('Victory');
        this.scene.restart();
        return;
    }

    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;

    for (let i =  0; i < numEnemies; i++) {
        enemies[i].y += enemies[i].speed;

        let conditionUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;
        let conditionDown = enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;

        if (conditionUp || conditionDown) {
            enemies[i].speed *= -1;
        }

        let enemyRect = enemies[i].getBounds();

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
            console.log('Game Over');
            return this.gameOver()
        }
    }

};

gameScene.gameOver = function() {
    this.isTerminating = true;

    this.cameras.main.shake(500);

    this.cameras.main.on('camerashakecomplete', function(camera, effect) {
        this.cameras.main.fade(500);
    }, this);

    this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
        this.scene.restart();
    }, this);
};

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};

let game = new Phaser.Game(config);