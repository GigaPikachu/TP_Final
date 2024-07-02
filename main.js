import pantalla_inicial from "./scenes/pantalla_inicial.js";
import menu_personajes from "./scenes/menu_personajes.js";
import menu_config from "./scenes/pantalla_configuraciones.js";
import Gameover from "./scenes/GameOver.js";
import Game from "./scenes/Game.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 216,
  height: 216,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 216,
      height: 216,
    },
    max: {
      width: 216 * 2,
      height: 216 * 2,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: false, //muestra los colaiders y los movimientos
    },
  },

  pixelArt: true,
  
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [pantalla_inicial, menu_config, menu_personajes, Game, Gameover],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);