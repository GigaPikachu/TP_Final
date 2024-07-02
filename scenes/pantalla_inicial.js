export default class pantalla_inicial extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init(data) {
    this.idioma = data.idioma || "Espanol";
    this.sonido = data.sonido || 100;

    this.opciones = 0;
    this.Arriba = false;
    this.abajo = false;
  }

  preload() {
    //background//
    this.load.image ("fondo", "./public/background/fondo.jpg");
    //background//
  }

  create() {
    //caja de fondo//
    this.fondo = this.add.image(108, 108, "fondo");

    //teclado
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.cursors = this.input.keyboard.createCursorKeys();

    //texto
    if (this.idioma == "Espanol"){
      this.titulo = this.add.text(216 / 2, 216 / 4, "¡No mojes al gato!", { fontFamily: 'GameBoy', fontSize: 12, color: '#ffff00'}).setOrigin(0.5, 0.5);
      this.opcion1 = this.add.text(216 / 2, 216 / 2, "comenzar", { fontFamily: 'GameBoy', fontSize: 8, color: '#ff0000'}).setOrigin(0.5, 0.5).setInteractive();
      this.opcion2 = this.add.text(216 / 2, 216 / 2 + 12, "gatos", { fontFamily: 'GameBoy', fontSize: 8, color: '#ffffff'}).setOrigin(0.5, 0.5).setInteractive();
      this.opcion3 = this.add.text(216 / 2, 216 / 2 + 24, "configuracion", { fontFamily: 'GameBoy', fontSize: 8, color: '#ffffff'}).setOrigin(0.5, 0.5).setInteractive();
    }
    else{
      this.titulo = this.add.text(216 / 2, 216 / 4, "Let me sleep!", { fontFamily: 'GameBoy', fontSize: 12, color: '#ffff00'}).setOrigin(0.5, 0.5);
      this.opcion1 = this.add.text(216 / 2, 216 / 2, "Start", { fontFamily: 'GameBoy', fontSize: 8, color: '#ff0000'}).setOrigin(0.5, 0.5).setInteractive();
      this.opcion2 = this.add.text(216 / 2, 216 / 2 + 12, "Cats", { fontFamily: 'GameBoy', fontSize: 8, color: '#ffffff'}).setOrigin(0.5, 0.5).setInteractive();
      this.opcion3 = this.add.text(216 / 2, 216 / 2 + 24, "configurations", { fontFamily: 'GameBoy', fontSize: 8, color: '#ffffff'}).setOrigin(0.5, 0.5).setInteractive();
    }
  }

  update() {
    this.titulo.setFontFamily('GameBoy');

    if (this.cursors.down.isDown) { //si precionan el boton de abajo
      if (this.abajo == false) {
        this.abajo = true;
        if (this.opciones == 2) { //si esta en la ultima opcion pasa a la primera
          this.opciones = 0;
        }
  
        else{
          this.opciones ++;
        }
      }
    }
    else {
      this.abajo = false;
    }

    if (this.cursors.up.isDown) { //si preciona el boton de arriba
      if (this.arriba == false){
        this.arriba = true;
        if (this.opciones == 0) { //si esta en la primera opcion pasa a la ultima
          this.opciones = 2;
        }
  
        else{
          this.opciones --;
        }
      }
    }

    else {
      this.arriba = false;
    }

    if (this.opciones == 0) {
      this.opcion1.setColor('#ff0000')
      this.opcion2.setColor('#ffffff')
      this.opcion3.setColor('#ffffff')
      if (this.enter.isDown) { //si precionan enter
        this.scene.start('game', {idioma: this.idioma, sonido: this.sonido});
      }
    }

    if (this.opciones == 1) {
      this.opcion1.setColor('#ffffff')
      this.opcion2.setColor('#ff0000')
      this.opcion3.setColor('#ffffff')
      if (this.enter.isDown) { //si precionan enter
        this.scene.start('main2');
      }
    }

    if (this.opciones == 2) {
      this.opcion1.setColor('#ffffff')
      this.opcion2.setColor('#ffffff')
      this.opcion3.setColor('#ff0000')
      if (this.enter.isDown) { //si precionan enter
        this.scene.start('configuraciones');
      }
    }
  }
}