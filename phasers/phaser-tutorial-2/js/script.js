let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let platforms;

function preload() {
    this.load.image('sky', 'img/sky.png');
    this.load.image('ground', 'img/platform.png');
    this.load.image('star', 'img/star.png');
    this.load.image('bomb', 'img/bomb.png');
    this.load.spritesheet('player', 'img/dude.png', {frameWidth: 32, frameHeight: 48});
}

function create() {
    this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'sky');

    let score = 0;
    let scoreText;

    scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.2);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{key: 'player', frame: 4}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(this.player, platforms);


    this.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: {x: 12, y: 0, stepX: 70}
    });

    this.stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.stars, platforms);
    this.physics.add.overlap(this.player, this.stars, collectStar, null, this);

    this.bombs = this.physics.add.group();
    this.physics.add.collider(this.bombs, platforms);
    this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);

    function collectStar(player, star) {
        star.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate(function (child) {

                child.enableBody(true, child.x, 0, true, true);

            });

            let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            let bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }

    function hitBomb(player, bomb) {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    }
}

function update() {
    let cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        this.player.setVelocityX(-160);

        this.player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        this.player.setVelocityX(160);

        this.player.anims.play('right', true);
    } else {
        this.player.setVelocityX(0);

        this.player.anims.play('turn');
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-330);
    }
}