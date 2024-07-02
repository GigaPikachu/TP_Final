import { handleMovement } from "./../public/scripts/movimientos.js";
import { Animaciones } from "./../public/scripts/animaciones.js";
import { animMovement } from "./../public/scripts/act_anims.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init(data) {
    this.idioma = data.idioma || "Espanol";

    //nivel
    this.nivel = 1;

    // Vidas
    this.vidas =  7;

    //puntos
    this.score = 0;

    this.personaje = data.personaje || "gato1";
  }

  preload() {
    // Background
    this.load.image("fondo", "./public/background/fondo.jpg");
    this.load.image("pared", "./public/background/pared.png");
    this.load.image("piso", "./public/background/piso.png");
    // Sprites
    this.load.spritesheet("gato1", "./public/sprites/gato_spritesheet.png", {frameWidth: 32, frameHeight: 32, key: "black",});
    this.load.image("pez", "./public/sprites/pez.png");
    this.load.image("agua", "./public/sprites/agua.png");

    //sonidos
    this.load.audio("punto", "./public/audio/moneda.wav")
    this.load.audio("salto", "./public/audio/salto.wav")
  }

  create() {
    // Fondo
    this.fondo = this.add.image(108, 108, "fondo");

    this.paredes = this.physics.add.staticGroup();
    this.paredes.create(8, 108, "pared");
    this.paredes.create(208, 108, "pared");
    this.paredes.create(108, 8, "piso");

    this.piso = this.physics.add.staticImage(108, 208, "piso");

    // Objetos
    this.pez = this.physics.add.image( Phaser.Math.Between(24, 192), Phaser.Math.Between(100, 192), "pez" );
    this.pez.body.setSize(13, 10);
    this.pez.body.setAllowGravity(false);

    this.aguas = this.physics.add.group();

    // Evento cada 1 segundo
    this.time.addEvent({
      delay: 500,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });

    // Jugador
    this.gato = this.physics.add.sprite(108, 192, this.personaje);
    this.gato.body.setSize(20, 20);
    this.gato.setCollideWorldBounds(true);

    Animaciones(this);

    // Vidas
    this.num_vidas = this.add.text(18, 18, "<".repeat(this.vidas), { fontFamily: "GameBoy", fontSize: 8, color: "#FF0000",});

    // Puntaje
    if (this.idioma == "Espanol"){
      this.puntaje = this.add.text(128, 18, "puntos:" + this.score, {fontFamily: "GameBoy", fontSize: 8, color: "#ffffff",});
    }
    else{
      this.puntaje = this.add.text(128, 18, "score:" + this.score, {fontFamily: "GameBoy", fontSize: 8, color: "#ffffff",});
    }

    //Audios//
    this.punto = this.sound.add("punto");
    this.salto = this.sound.add("salto");

    // Colisiones con el personaje
    this.physics.add.collider(this.gato, this.paredes, () => {this.gato.tocandoParedes = true;});
    this.physics.add.collider(this.gato, this.piso, () => {this.gato.tocandoPiso = true;});
    this.physics.add.overlap(this.gato,this.pez, this.collisionHandler, null, this);
    this.physics.add.overlap(this.gato, this.aguas, this.menos1vida, null, this);

    // Control
    this.cursors = this.input.keyboard.createCursorKeys();

    // Game Over
    this.gameover = this.add.text(44, 100, "", { fontFamily: "GameBoy", fontSize: 8, color: "#ffffff", });
    this.reintentar = this.add.text(44, 132, "", { fontFamily: "GameBoy", fontSize: 6, color: "#ffffff", });
  }

  update() {
    if (this.gato.tocandoPiso && this.cursors.up.isDown){
      this.salto.play();
    }
    // Manejo del movimiento
    const { velocityX, velocityY, aceleracion } = handleMovement( this.gato, this.cursors );
    this.gato.setVelocityX(velocityX);
    if (velocityY < 0) {
      this.gato.setVelocityY(velocityY);
    }
    this.gato.setAccelerationX(aceleracion);

    // Manejo de animaciones
    animMovement(this.gato, this.cursors);

    // Ajuste de escala y posición del gato
    if (this.gato.body.velocity.x > 0) {
      this.gato.body.setOffset(6, 6);
      this.gato.setScale(1, 1); // Posición normal
    }
    else if (this.gato.body.velocity.x < 0) {
      this.gato.body.setOffset(26, 6);
      this.gato.setScale(-1, 1); // Voltea horizontalmente
    }

    // Game Over
    if (this.vidas === 0 || this.score === 999) {
      this.gameover.setText("¿Vas a dejar al pobre gato así?");
      this.reintentar.setText("Press F5 to retry");
      this.scene.start("gameover", { puntaje: this.score, gato_x: this.gato.x, gato_y: this.gato.y});
    }

    //actualizar si el gato esta tocando el piso o las paredes//
    this.gato.tocandoPiso = false;
    this.gato.tocandoParedes = false;
  }

  collisionHandler() {
    this.punto.play();

    this.pez.x = Phaser.Math.Between(24, 192);
    this.pez.y = Phaser.Math.Between(100, 192);
    this.pez.setVelocity(0, 0);
    this.score++;
    if (this.idioma == "Espanol"){
      this.puntaje.setText("puntos:" + this.score);
    }

    else{
      this.puntaje.setText("score:" + this.score);
    }
  }

  onSecond() {// Cada un segundo
    this.aguas.create(Phaser.Math.Between(24, 192), 24, "agua");
  }

  menos1vida(gato, aguas) {
    this.cameras.main.shake(100, 0.02);
    if (this.vidas > 0) {
      aguas.destroy();
      this.vidas--;
      this.num_vidas.setText("<".repeat(this.vidas));
    }
    else {
      this.gameover.setText("¿Vas a dejar al pobre gato así?");
    }
  }
}