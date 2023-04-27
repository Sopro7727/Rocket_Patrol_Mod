/*
    Noah Walker
    Mods:
        Randomize each spaceship's movement direction at the start of each play (5)
        Track a high score that persists across scenes and display it in the UI (5)
        Display the time remaining (in seconds) on the screen (10)
        /Implement the 'FIRE' UI text from the original game (5) 
        /Add your own (copyright-free) background music to the Play scene (please be mindful of the volume) (5)
        /Implement the speed increase that happens after 30 seconds in the original game (5)
        /Create a new scrolling tile sprite for the background (5)
        /Allow the player to control the Rocket after it's fired (5)
        /Create 4 new explosion sound effects and randomize which one plays on impact (10)
        /Using a texture atlas, create a new animated sprite for the Spaceship enemies (10)
        /Create a new title screen (e.g., new artwork, typography, layout) (10)
        /Implement parallax scrolling for the background (10)
        Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
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
