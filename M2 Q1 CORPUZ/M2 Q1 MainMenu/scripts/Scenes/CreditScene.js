class CreditScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CreditScene' });
  }

  preload() {
    this.load.image('background', 'assets/images/MAINbg.png');
  }

  create() {
    this.add.image(400, 300, 'background'); 

    this.add.text(400, 100, 'Credits', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
    this.add.text(400, 200, 'Game developed by:', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    this.add.text(400, 250, 'Jhelloh Corpuz', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    this.add.text(400, 300, 'Assets by:', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
    this.add.text(400, 350, 'https://www.spriters-resource.com/', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);

    const backButton = this.add.text(20, 20, 'Back to Main Menu', { fontSize: '32px', fill: '#ff0000' }).setOrigin(0.5);
    backButton.setInteractive();

    backButton.on('pointerup', () => {
      this.scene.start('MainMenuScene'); 
    });

    this.add.text(400, 400, 'Phaser Game Made by', {
      fontSize: '48px',
      fill: '#ffffff',
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#000000',
        blur: 4,
        stroke: false,
        fill: true
      }
    }).setOrigin(0.5);

    this.add.text(400, 450, 'A223', {
      fontSize: '36px',
      fill: '#ffffff',
      shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#000000',
        blur: 4,
        stroke: false,
        fill: true
      }
    }).setOrigin(0.5);
  }
}
