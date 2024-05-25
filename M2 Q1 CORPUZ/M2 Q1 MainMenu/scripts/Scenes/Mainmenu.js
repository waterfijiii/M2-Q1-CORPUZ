class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  preload() {
    this.load.image('background', 'assets/images/MAINbg.png');
    this.load.image('startButton', 'assets/images/start.png');
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0, 0);
    let startButton = this.add.image(300, 150, 'startButton').setInteractive();
    startButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    this.add.text(500, 400, 'Click to Start', { fontSize: '32px', fill: '#000' });
  }
}