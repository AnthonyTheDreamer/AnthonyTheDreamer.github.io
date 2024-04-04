class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        this.load.image('face', 'img/face.png');
        this.load.spritesheet('boy', 'img/boy.png', { frameWidth: 120, frameHeight: 200 });
        this.load.audio('cat', [
            'audio/meow.mp3',
            'audio/meow.ogg'
        ]);
        this.load.image('apple', 'img/apple.png');
    }
    create() {
        this.face = this.add.image(game.config.width/2, game.config.height/2, 'face');
        this.face.setInteractive();
        this.face.on('pointerdown', this.onDown, this);
        this.face.on('pointerup', this.onUp, this);

        this.char = this.add.sprite(0, game.config.height/2, 'boy');

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(8, 0xff0000);
        this.graphics.fillStyle(0xff00ff, .5);

        // this.graphics.moveTo(0, 0);
        // this.graphics.lineTo(100, 300);

        // this.graphics.strokeRect(100, 200, 50, 50);

        // this.graphics.strokeCircle(100, 200, 60);
        this.graphics.strokeCircle();
        this.graphics.fillCircle(100,200,60);

        // this.graphics.strokePath();

        this.catSound = this.sound.add('cat');
        this.catSound.play();

        // const appleGroup = this.add.group();
        const appleCon = this.add.container();

        for (let i = 0; i < 5; i++) {
            const xx = Phaser.Math.Between(100, 400);
            const yy = Phaser.Math.Between(100, 400);
            const apple = this.add.image(xx, yy, 'apple');
            // appleGroup.add(apple);
            appleCon.add(apple);
        }
        // testObj = appleGroup;
        testObj = appleCon;

        const frameNames = this.anims.generateFrameNumbers('boy');

        this.anims.create({
            key: 'walk',
            frames: frameNames,
            frameRate: 16,
            repeat: -1
        });

        this.char.play('walk');
        this.doWalk();

        this.text1 = this.add.text(game.config.width/2, game.config.height/2, 'Hello', { fontFamily: 'Anton', color: '#ff0000', fontSize: '40px' });
        this.text1.setOrigin(0.5, 0.5)
    }

    onDown() {
        this.face.alpha = .5;
    }

    onUp() {
        this.face.alpha = 1;
    }

    doWalk() {
        this.tweens.add({
            targets: this.char,
            duration: 5000,
            x: game.config.width,
            y: 0,
            alpha: 0,
            onComplete: this.onCompleteHandler.bind(this)
        });
    }

    onCompleteHandler(tween, targets, custom) {
        const char = targets[0];
        char.x = 0;
        char.y = game.config.height /2;
        char.alpha = 1;
        this.doWalk();
    }

    update() {

    }
}