let platforms;
let cursors;
let ustar;
let player;
let stars;
let bombs;
let scoreText;
let score = 0;
let colorIndex = 0;
let colors = ['0xff0000', '0xffa500', '0xffff00', '0x00ff00', '0x0000ff', '0x4b0082', '0x9400d3'];
let starCollected = 0;
let gameOver = false;

class GameScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GameScene' });
    }
  
    preload() {
      this.load.spritesheet('player', 'assets/images/slime3.png', { frameWidth: 32, frameHeight: 32 });
      this.load.image('star', 'assets/images/starr.png');
      this.load.image('bomb', 'assets/images/bomba.png');
      this.load.image('background', 'assets/images/forest.jpg');
      this.load.image('platform', 'assets/images/plat.png');
      this.load.image('ustar', 'assets/images/pstar.png');
    }
  
    create() {
    
      this.add.image(0, 0, 'background').setOrigin(0, 0);
  
      platforms = this.physics.add.staticGroup();
  
      let platformPositions = [
        { x: 100, y: 300, width: 300 },  
        { x: 200, y: 200, width: 150 },  
        { x: 500, y: 150, width: 100 }, 
        { x: 600, y: 100, width: 200 }   
      ];

      platformPositions.forEach(pos => {
        let platform = platforms.create(pos.x, pos.y, 'platform').setDisplaySize(pos.width, 20);
        platform.refreshBody();
      });
  
      ustar = this.add.image(1100, 65, "ustar").setScale(1);
  
      player = this.physics.add.sprite(100, 500, 'player');
      player.setCollideWorldBounds(true);
      player.setScale(1.3);
  
      stars = this.physics.add.group();
      bombs = this.physics.add.group();
  
      for (let i = 0; i < 7; i++) {
        let x = Phaser.Math.Between(100, 1100);
        let y = Phaser.Math.Between(-600, -100);
        let star = stars.create(x, y, 'star').setScale(0.3);
        star.body.setBounce(1);
        star.body.setVelocityY(Math.random() * 100 + 50);
      }
  
      for (let i = 0; i < 5; i++) {
        let x = Phaser.Math.Between(100, 1100);
        let y = Phaser.Math.Between(-600, -100);
        let bomb = bombs.create(x, y, 'bomb').setScale(2);
        bomb.body.setBounce(.95);
        bomb.body.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }
  
      this.physics.add.collider(player, platforms);
      this.physics.add.collider(stars, platforms);
      this.physics.add.collider(bombs, platforms);
      this.physics.add.collider(player, stars, hitStar, null, this);
      this.physics.add.collider(player, bombs, hitBomb, null, this);
  
      scoreText = this.add.text(16, 16, 'Stars Collected: 0', { fontSize: '32px', fill: '#000' });
  
      cursors = this.input.keyboard.createCursorKeys();
  
      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
      });
  
      this.anims.create({
        key: 'turn',
        frames: [{ key: 'player', frame: 3 }],
        frameRate: 20
      });
  
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        frameRate: 10,
        repeat: -1
      });
  
      this.time.addEvent({ delay: 3000, callback: createBomb, callbackScope: this, loop: true });
    }
  
    update() {
      if (!gameOver) {
        if (cursors.left.isDown) {
          player.setVelocityX(-160);
          player.anims.play('left', true);
          //player.setFlipX(true);
        } else if (cursors.right.isDown) {
          player.setVelocityX(160);
          player.anims.play('right', true);
          //player.setFlipX(false);
        } else {
          player.setVelocityX(0);
          player.anims.play('turn');
        }
  
        if (cursors.up.isDown) {
          player.setVelocityY(-330);
        }
      }
  
      stars.children.iterate(function (child) {
        if (child.y > 600) {
          child.disableBody(true, true);
          if (stars.countActive(true) === 0) {
            stars.children.iterate(function (child) {
              child.enableBody(true, child.x, 0, true, true);
            });
          }
        }
      });
  
      scoreText.setText('Stars Collected: ' + score);
    }
  }
  
  function hitStar(player, star) {
    star.disableBody(true, true);
    score++;
    starCollected++;
  
    if (score % 7 === 0) {
      colorIndex++;
      if (colorIndex === colors.length) {
        colorIndex = 0;
      }
      player.setTint(colors[colorIndex]);
    }
  
    if (starCollected === 7) {
      player.setScale(player.scaleX + 0.1, player.scaleY + 0.1);
      starCollected = 0;
    }
  
    scoreText.setText('Stars Collected: ' + score);
    checkWin.call(this);
  }
  
  function checkWin() {
    if (score === 7) {
      gameOver = true;
      this.physics.pause();
      player.setTint(0x00ff00);
      this.add.text(326.5, 188, 'You Win!', { fontSize: '64px', fill: '#000' });
    }
  }
  
  function hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    gameOver = true;
    this.add.text(126.5, 188, 'Game Over', { fontSize: '64px', fill: '#000' });
  }
  
  function createBomb() {
    let bomb = bombs.create(Phaser.Math.Between(100, 1100), 5, 'bomb');
    bomb.setScale(2);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
  
  