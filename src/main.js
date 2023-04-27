/*
    Noah Walker
    Mods:
        Randomize each spaceship's movement direction at the start of each play (5)
        Track a high score that persists across scenes and display it in the UI (5)
        Display the time remaining (in seconds) on the screen (10) 



*/
let config ={
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);
//reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
//set UI sizes
let borderUISize = game.config.height/15;
let borderPadding = borderUISize/3;
let highScore = 0;
let secondCount = 120;
let timer;
