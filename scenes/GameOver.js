import { Animaciones } from "./../public/scripts/animaciones.js";
import { animMovement } from "./../public/scripts/act_anims.js";

export default class GameOver extends Phaser.Scene {
    constructor() {
        super("gameover")
    }

    init(data) {
        this.score = data.puntaje || 0;
        this.gato_y = data.gato_y;
        this.gato_x = data.gato_x;

        this.personaje = data.personaje || "gato1";
    }

    preload(){
        this.load.image ("fondo", "./public/background/fondo.jpg");
        this.load.spritesheet("gato1", "./public/sprites/gato_spritesheet.png", {frameWidth: 32, frameHeight: 32, key: "black",});
    }

    create(){

        // Jugador
        this.gato = this.physics.add.sprite(this.gato_x, this.gato_y, this.personaje);
        this.gato.body.setSize(20, 20);
        this.gato.setCollideWorldBounds(true);
    
        Animaciones(this);
        //caja de fondo//
        this.fondo = this.add.image(108, 108, "fondo");

        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.add.text(44, 100, "tu puntaje es " + this.score, { fontFamily: 'GameBoy', fontSize: 8, color: '#ffffff' })
    }

    update () {
        if (this.enter.isDown) {
            this.scene.start("main");
        }
    }
}