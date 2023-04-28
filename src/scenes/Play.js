class Play extends Phaser.Scene{

    constructor(){
        super("playScene");
    }

    preload(){
        //load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship','./assets/spaceship.png');
        this.load.image('starfield','./assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){
        this.add.text(20,20,"Rocket Patrol Play");
        //place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);
        //green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);        
        //white border
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0);
        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //add spaceships x3
        this.ship01 = new Spaceship(this, game.config.width + borderUISize *6, borderUISize*4, 'spaceship',0,15).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0,10).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0,5).setOrigin(0,0);
        if(this.ship01.direction == 0){
            this.ship01.x = 0 - borderUISize *6
            this.ship01.setFlipX(true);
        }
        if(this.ship02.direction == 0){
            this.ship02.x = 0 - borderUISize*3
            this.ship02.setFlipX(true);
        }
        if(this.ship03.direction == 0){
            this.ship03.x = 0
            this.ship03.setFlipX(true);
        }
        this.anims.create({key:'explode', frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),frameRate: 30});
        //initialize score
        this.p1Score = 0;
        //display score
        let scoreConfig = {
            fontFamily: 'Courier', 
            fontSize: '18px', 
            backgroundColor: '#F3B141', 
            color: '#843605', 
            align: 'right', 
            padding: {top: 5, bottom: 5,}, 
            fixedWidth: 100}
        this.scoreText = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, "Score:", scoreConfig);
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*4, this.p1Score, scoreConfig);
        //display HighScore
        let highScoreConfig = {
            fontFamily: 'Courier', 
            fontSize: '18px', 
            backgroundColor: '#F3B141', 
            color: '#843605', 
            align: 'left', 
            padding: {top: 5, bottom: 5,}, 
            fixedWidth: 120}
        this.highScoreText = this.add.text(game.config.width - borderPadding*18, borderUISize + borderPadding*2, "High Score:", highScoreConfig)
        this.highScoreRight = this.add.text(game.config.width - borderPadding*18, borderUISize + borderPadding*4, highScore, highScoreConfig);
        // GAME OVER flag
        this.gameOver = false;
        //display Clock
        let clockConfig = {
            fontFamily: 'Courier', 
            fontSize: '30px', 
            backgroundColor: '#F3B141', 
            color: '#843605', 
            align: 'center', 
            padding: {top: 5, bottom: 5,}, 
            fixedWidth: 55}
        //60-second play clock
        scoreConfig.fixedWidth = 0;
        timer = game.settings.gameTimer / 1000;
        this.clockText = this.add.text(300, borderUISize + borderPadding*3, timer, clockConfig);
        let speedUp = false;
        let fireConfig = {
            fontFamily: 'Courier', 
            fontSize: '40px', 
            backgroundColor: '#F3B141', 
            color: '#843605', 
            align: 'center', 
            padding: {top: 5, bottom: 5,}, 
            fixedWidth: 100}
        fireText = this.add.text(borderUISize + borderPadding*3, 100, "FIRE", fireConfig);
        fireText.alpha = 0;
    }

    update(){
        secondCount = secondCount - 1;
        if(timer == 0){
            this.funGameOver();
            //check key input for restart
            if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
                this.scene.restart();
            }
            if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
                this.scene.start("menuScene");
            }
        }
        if(isFiring){
            fireText.alpha = 1;
        }
        if(secondCount <= 0 && !this.gameOver){
            this.timerUpdate();
        } 
        this.starfield.tilePositionX -= 1;  //updates scrolling background
        if(!this.gameOver){
            this.p1Rocket.update();         //update rocket sprite
            this.ship01.update();           //update spaceships x3
            this.ship02.update();
            this.ship03.update();
        }
        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);        }
        if(this.checkCollision(this.p1Rocket,this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);        }
        if(!backgroundMusic.isPlaying){
            backgroundMusic.play();
        }
    }

    checkCollision(rocket, ship){
        // simple AABB checking
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y){
            fireText.alpha = 0;
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship){
        //temporarily hide ship
        ship.alpha = 0;
        //create explosion sprite at ship's position
        timer += 5;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');             //play explode anim
        boom.on('animationcomplete', ()=> {     //callback after anim completes
            ship.reset();                       //reset ship position
            ship.alpha = 1;                     //make ship visible again
            boom.destroy();                     //remove explosion sprite
        })
        //console.log(this.time.now/1000);
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.time.now -= 5000;
        
        //console.log(game.settings.gameTimer);
        this.sound.play('sfx_explosion');
    }

    timerUpdate(){
        timer -= 1; 
        this.clockText.text = timer;
        if(timer < 0){
            return 0;
        }
        if(timer == 30 && !this.speedUp){
            this.speedUp = true;
            this.ship01.moveSpeed += 3;
            this.ship02.moveSpeed += 2;
            this.ship03.moveSpeed += 1;
        }
        //console.log(this.clockText);
        secondCount = 120;
    }

    funGameOver(){
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', this.scoreConfig).setOrigin(0.5);
        this.gameOver = true;
        if(this.p1Score > highScore){
            highScore = this.p1Score;
        }
        //console.log(this.time.now/1000);
    }
}