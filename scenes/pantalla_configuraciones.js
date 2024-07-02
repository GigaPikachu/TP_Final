export default class menu_config extends Phaser.Scene {
    constructor() {
      super("configuraciones");
      this.porsentaje = 100;
      this.idioma = "Espanol";
      this.pantalla = "Minimizada"

      this.opciones = 1;

      this.arriba = false;
      this.abajo = false;
      this.izquierda = false;
      this.derecha = false;
    }

    init() {

    }

    preload() {
        //background//
        this.load.image ("fondo", "./public/background/fondo.jpg");
        //background//
    }

    create() {
        //caja de fondo//
        this.fondo = this.add.image(108, 108, "fondo")

        //teclado
        this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.cursors = this.input.keyboard.createCursorKeys();

        //texto
        this.titulo = this.add.text(216 / 2, 216 / 4, "Configuraciones", { fontFamily: 'GameBoy', fontSize: 12, color: '#ffff00'}).setOrigin(0.5, 0.5);
        this.opcion1 = this.add.text(216 / 2, 216 / 2, "sonido: " + this.porsentaje + "%", { fontFamily: 'GameBoy', fontSize: 8, color: '#ff0000'}).setOrigin(0.5, 0.5).setInteractive();
        this.opcion2 = this.add.text(216 / 2, 216 / 2 + 12, "idioma: " + this.idioma, { fontFamily: 'GameBoy', fontSize: 8, color: '#ffffff'}).setOrigin(0.5, 0.5).setInteractive();
        this.opcion3 = this.add.text(216 / 2, 216 / 2 + 24, "pantalla: " + this.pantalla, { fontFamily: 'GameBoy', fontSize: 8, color: '#ffffff'}).setOrigin(0.5, 0.5).setInteractive();
    }

    update() {

        //arriba y abajo
        if (this.cursors.down.isDown) { //si precionan el boton de abajo
            if (this.abajo == false) {
                this.abajo = true;
                if (this.opciones == 3) { //si esta en la ultima opcion pasa a la primera
                  this.opciones = 1;
                }
      
                else{
                    this.opciones += 1;
                }
            }
        }
        else {
            this.abajo = false;
        }

        if (this.cursors.up.isDown) { //si precionan el boton de arriba
            if (this.arriba == false) {
                this.arriba = true;
                if (this.opciones == 1) { //si esta en la primera opcion pasa a la ultima
                    this.opciones = 3;
                }
      
                else{
                    this.opciones -= 1;
                }
            }
        }
        else {
            this.arriba = false;
        }
    
        //modificar confiruraciones de izquierda a derecha
        if (this.opciones == 1) { //sonido
            this.opcion1.setColor('#ff0000')
            this.opcion2.setColor('#ffffff')
            this.opcion3.setColor('#ffffff')

            //cambiar volumen del sonido//
            if (this.cursors.left.isDown) { //izquierda
                if (this.porsentaje > 0){
                    this.porsentaje -=1

                    if (this.idioma == "Espanol") {
                        this.opcion1.setText("sonido: " + this.porsentaje + "%")
                    }
                    else{
                        this.opcion1.setText("sound: " + this.porsentaje + "%")
                    }
                }
            }

            if (this.cursors.right.isDown) { //derecha
                if (this.porsentaje < 100){
                    this.porsentaje += 1

                    if (this.idioma == "Espanol") {
                        this.opcion1.setText("sonido: " + this.porsentaje + "%")
                    }
                    else{
                        this.opcion1.setText("sound: " + this.porsentaje + "%")
                    }
                }
            }
        }

        if (this.opciones == 2) { //idioma
            this.opcion1.setColor('#ffffff')
            this.opcion2.setColor('#ff0000')
            this.opcion3.setColor('#ffffff')

            //cambiar idioma
            if (this.cursors.right.isDown) { //derecha
                if (this.derecha == false){
                    this.derecha = true;
                    if (this.idioma == "Espanol") {
                        this.idioma = "English";
                        
                        this.titulo.setText("Configurations")
                        this.opcion2.setText("language: " + this.idioma)
                        this.opcion1.setText("sound: " + this.porsentaje + "%")
                        if (this.pantalla == "Cine") {
                            this.opcion3.setText("screen: full");
                        }
                        else {
                            this.opcion3.setText("screen: windowed");
                        }
                    }
                    else if (this.idioma == "English") {

                        this.idioma = "Espanol";

                        this.titulo.setText("Configuraciones")
                        this.opcion2.setText("idioma: " + this.idioma)
                        this.opcion3.setText("pantalla: " + this.pantalla);
                        this.opcion1.setText("sonido: " + this.porsentaje + "%")
                    }
                }
            }
            else{
                this.derecha = false;
            }
            
            if (this.cursors.left.isDown) { //izquierda
                if (this.izquierda == false){
                    this.izquierda = true;
                    if (this.idioma == "Espanol") {
                        this.idioma = "English";
                        
                        this.titulo.setText("Configurations")
                        this.opcion2.setText("language: " + this.idioma)
                        this.opcion1.setText("sound: " + this.porsentaje + "%")
                        if (this.pantalla == "Cine") {
                            this.opcion3.setText("screen: full");
                        }
                        else {
                            this.opcion3.setText("screen: windowed");
                        }
                    }

                    else if (this.idioma == "English") {

                        this.idioma = "Espanol";

                        this.titulo.setText("Configuraciones")
                        this.opcion2.setText("idioma: " + this.idioma)
                        this.opcion3.setText("pantalla: " + this.pantalla);
                        this.opcion1.setText("sonido: " + this.porsentaje + "%")
                    }
                }
            }
            else{
                this.izquierda = false;
            }
        }

        if (this.opciones == 3) { //pantalla
            this.opcion1.setColor('#ffffff');
            this.opcion2.setColor('#ffffff');
            this.opcion3.setColor('#ff0000');
        
            if (this.cursors.left.isDown && !this.izquierda) { //izquierda
                this.izquierda = true;
                if (this.pantalla == "Cine") {
                    this.pantalla = "Minimizada";

                    if (this.idioma == "Espanol"){
                        this.opcion3.setText("pantalla: " + this.pantalla);
                    }
                    else{
                        this.opcion3.setText("screen: windowed");
                    }

                    this.scale.stopFullscreen();
                }
            } else if (!this.cursors.left.isDown) {
                this.izquierda = false;
            }
        
            if (this.cursors.right.isDown && !this.derecha) { //derecha
                this.derecha = true;
                if (this.pantalla === "Minimizada") {
                    this.pantalla = "Cine";

                    if (this.idioma == "Espanol"){
                        this.opcion3.setText("pantalla: " + this.pantalla);
                    }
                    else{
                        this.opcion3.setText("screen: full");
                    }

                    this.scale.startFullscreen();
                }
            } else if (!this.cursors.right.isDown) {
                this.derecha = false;
            }
        }

        //guardar las configuraciones
        if (this.enter.isDown) { //si precionan enter
            this.scene.start('main', {idioma: this.idioma, sonido: this.sonido});
        }
    }
}