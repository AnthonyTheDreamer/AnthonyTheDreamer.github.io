class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {
        this.load.image('road', 'img/road.jpg');
        this.load.spritesheet('cars', 'img/cars.png', { frameWidth: 60, frameHeight: 126 });
        this.load.image('line', 'img/line.png');
        this.load.image('pcar1', 'img/pcar1.png');
        this.load.image('pcar2', 'img/pcar2.png');
        this.load.image('cone', 'img/cone.png');
        this.load.image('barrier', 'img/barrier.png');
    }

    create() {
        emitter = new Phaser.Events.EventEmitter();
        // model.score = 0;
        controller = new Controller();

        this.road = new Road({
            scene: this
        });
        this.road.x = game.config.width/2;
        this.road.makeLines();

        this.sb = new ScoreBox({
            scene: this
        });
        this.sb.x = game.config.width - 50;
        this.sb.y = 50;

        this.alignGrid = new AlignGrid({
            scene: this,
            rows: 5,
            cols: 5
        });
        this.alignGrid.showNumbers();
        this.alignGrid.placeAtIndex(4, this.sb);
    }

    update() {
        this.road.moveLines();
        this.road.moveObject();
    }
}