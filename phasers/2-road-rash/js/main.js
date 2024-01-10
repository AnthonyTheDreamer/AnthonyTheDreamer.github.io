let game;
let model;
let emitter;
let G;
let controller;

window.onload = function() {
    let config;

    let isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }

    if (isMobile == -1) {
        config = {
            type: Phaser.AUTO,
            width: 480,
            height: 640,
            parent: 'phaser-game',
            scene: [SceneMain]
        };
    }
    else {
        config = {
            type: Phaser.AUTO,
            width: window.innerWidth,
            height: window.innerHeight,
            parent: 'phaser-game',
            scene: [SceneMain]
        };
    }

    G = new Constants();
    model = new Model();
    game = new Phaser.Game(config);
};
