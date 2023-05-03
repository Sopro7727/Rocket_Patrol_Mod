class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        //load audio
        this.load.image('title','./assets/titleScreen.png');
        this.load.image('starfieldB','./assets/new_starfield_background.png');
        this.load.audio('sfx_select', './assets/assets_blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/assets_explosion38.wav');
        this.load.audio('sfx_rocket', './assets/assets_rocket_shot.wav');
        this.load.audio('background_music', './assets/vague_atmos.wav');
        this.load.audio('explosion1', './assets/explosion1.wav');
        this.load.audio('explosion2','./assets/explosion2.wav');
        this.load.audio('explosion3','./assets/explosion3.wav');
        this.load.audio('explosion4', './assets/explosion4.wav');
    }
    create(){
       
        //show menu text
        this.title = this.add.tileSprite(0, 0, 640, 480, 'title').setOrigin(0,0);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        backgroundMusic = this.sound.add('background_music', {volume: 0.5});
        backgroundMusic.play();
        let gameStart = false;
        }
    update(){
        if(Phaser.Input.Keyboard.JustDown(keyENTER)){
            this.gameStart = true;
            this.title.destroy();
             //menu text configuration
            let menuConfig = {
                fontFamily: 'Courier', 
                fontSize: '28px', 
                backgroundColor: '#F3B141', 
                color: '#843605', 
                align: 'right', 
                padding: {top: 5, bottom: 5,}, 
                fixedWidth: 0
                
            }
            this.add.text(game.config.width/2, game.config.height/2, "Use ←→ arrows_to move & (F) to fire", menuConfig).setOrigin(0.5);
            menuConfig.backgroundColor = '#00FF00';
            menuConfig.color = '#000';
            this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, "Press ← for Novice or → for Expert", menuConfig).setOrigin(0.5);
            backgroundMusic = this.sound.add('background_music', {volume: 0.5});
            backgroundMusic.play();
        }
        if(Phaser.Input.Keyboard.JustDown(keyLEFT) && this.gameStart == true){
            //easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT) && this.gameStart == true){
            //hard mode
            console.log('hard mode')
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if(!backgroundMusic.isPlaying){
            backgroundMusic.play();
        }
        if(!backgroundMusic.isPlaying){
            backgroundMusic.play();
        }
    }
}