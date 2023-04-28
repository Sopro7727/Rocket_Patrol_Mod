class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x,y,texture,frame){
        super(scene,x,y,texture,frame);
        //add object to existing scene
        scene.add.existing(this);
        isFiring = false;
        this.moveSpeed = 2;
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }
    update(){
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x+=this.moveSpeed;
            }
        }
        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !isFiring){
            isFiring = true;
            this.sfxRocket.play(); //play sfx
        }
        //if fired, move up 
        if(isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            } else if(keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x+=this.moveSpeed;
            }
        }
        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding){
            isFiring = false;
            this.y = game.config.height - borderUISize - borderPadding;
            fireText.alpha = 0;
        }
    }
    reset(){
        isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}