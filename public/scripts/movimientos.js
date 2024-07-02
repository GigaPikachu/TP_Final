let velocityX = 0;
let Vel_salto = -300;
let aceleracion = 0;
let velocity = 170;
let anim_sentado = false;
let anim_caminando = false;
let anim_sosteniendose = false;

function handleMovement(gato, cursors) {
  let velocityY = 0;

  //movimiento lateral//
  if (cursors.left.isDown) {
    if (gato.tocandoPiso) {
      aceleracion = 0;
      velocityX = -velocity;
    }
    else {
      aceleracion = -2000;
    }
  } else if (cursors.right.isDown) {
    if (gato.tocandoPiso) {
      aceleracion = 0;
      velocityX = velocity;
    }
    else {
      aceleracion = 2000;
    }
  }
  else if (gato.tocandoPiso) {
    velocityX = 0;
    aceleracion = 0;
  }

  //gato sosteniendose
  if (gato.body.touching.left && cursors.left.isDown && gato.tocandoPiso == false && cursors.up.isDown == false
  ) {
    gato.setVelocityY(25);
    if (anim_sosteniendose == false) {
      gato.anims.play("sosteniendose");
      anim_sosteniendose = true;
      console.log("se esta ejecutando la animacion");
    }
    anim_sentado = false;
    anim_caminando = false;
  }
  else if (gato.body.touching.right && cursors.right.isDown && gato.tocandoParedes && gato.tocandoPiso == false && cursors.up.isDown == false) {
    gato.setVelocityY(25);
  }

  //saltos//
  if (cursors.up.isDown && gato.tocandoPiso) {
    //saltar sin moverse//
    velocityY = Vel_salto;
  } else if (cursors.up.isDown && cursors.right.isDown && gato.tocandoParedes && gato.body.touching.right) {//saltar en la pared de la derecha
    velocityY = -200;
    velocityX = -150;
  } else if (cursors.up.isDown && cursors.left.isDown && gato.tocandoParedes && gato.body.touching.left) {
    //saltar en la paded de la izquierda
    velocityY = -200;
    velocityX = 150;
  }

  return { velocityX, velocityY, aceleracion };
}

export { handleMovement };
