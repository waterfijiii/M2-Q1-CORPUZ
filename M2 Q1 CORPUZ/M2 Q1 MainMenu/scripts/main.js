const config = {
  type: Phaser.CANVAS,
  width: 653,
  height: 376,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: [MainMenu, GameScene, CreditScene]
};

game = new Phaser.Game(config);
