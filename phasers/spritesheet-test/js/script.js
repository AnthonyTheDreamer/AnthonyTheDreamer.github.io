let gameScene = new Phaser.Scene('Game');

gameScene.init = function () {

};

gameScene.preload = function () {
    this.load.spritesheet('cuphead', 'img/cuphead.png', {frameWidth: 100, frameHeight: 155});
    this.load.spritesheet('cuphead-run', 'img/cuphead-run.png', {frameWidth: 137, frameHeight: 163});
};

gameScene.create = function () {
    this.player = this.add.sprite(100, this.sys.game.config.height / 2, 'cuphead-run');

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('cuphead-run'),
        frameRate: 15,
        repeat: -1
    });

    this.player.anims.play('idle');
};

gameScene.update = function () {

};

let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: gameScene,
};

let game = new Phaser.Game(config);