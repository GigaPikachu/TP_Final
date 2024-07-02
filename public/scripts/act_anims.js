let anim_sentado = false;
let anim_caminando = false;
let anim_sosteniendose = false

function animMovement(gato, cursors) {
    if (cursors.left.isDown){
        if (gato.body.touching.down) {
            if (anim_caminando == false) {
                gato.anims.play("caminando");
                anim_caminando = true;
            }
            anim_sentado = false;
            anim_sosteniendose = false;
        }

    }
    else if (cursors.right.isDown){
        if (gato.body.touching.down) {
            if (anim_caminando == false) {
                gato.anims.play("caminando");
                anim_caminando = true;
            }
            anim_sentado = false;
            anim_sosteniendose = false;
        }
    }

    else if (gato.body.touching.down) {
        if (anim_sentado == false) {
            gato.anims.play("sentado");
            anim_sentado = true;
        }
        anim_caminando = false;
        anim_sosteniendose = false;
    }

    //gato sosteniendose
    if (gato.body.touching.left && cursors.left.isDown && gato.body.touching.down == false && cursors.up.isDown == false) {
        if (anim_sosteniendose == false) {
            gato.anims.play("sosteniendose")
            anim_sosteniendose = true;
            console.log("se esta ejecutando la animacion")
        }
        anim_sentado = false;
        anim_caminando = false;
    }
    else if (gato.body.touching.right && cursors.right.isDown && gato.body.touching.down == false && cursors.up.isDown == false) {
        if (anim_sosteniendose == false) {
            gato.anims.play("sosteniendose")
            anim_sosteniendose = true;
        }
        anim_sentado = false;
        anim_caminando = false;
    }

    else {
        if (gato.body.velocity.y < -30) {
            gato.setFrame (8);
        }
        else if (gato.body.velocity.y <= 30 && gato.body.velocity.y >= -30 && gato.body.touching.down == false){
            gato.setFrame (9);
        }
        else if (gato.body.velocity.y > 30){
            gato.setFrame (10);
        }
    }
}

export { animMovement };