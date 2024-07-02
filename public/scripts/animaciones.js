export function Animaciones(scene) {

    scene.anims.remove('sentado')
    scene.anims.remove('caminando')
    scene.anims.remove('sosteniendose')
    

    scene.anims.create({ //gato sentado//
        key: "sentado",
        frames: scene.anims.generateFrameNumbers(scene.personaje, {
            frames: [0, 1, 2, 3]
        }),
        frameRate: 8,
        repeat: -1 // Repetir la animación infinitamente
    });

    scene.anims.create({ //gato caminando//
        key: "caminando",
        frames: scene.anims.generateFrameNumbers(scene.personaje, {
            frames: [4, 5, 6, 7]
        }),
        frameRate: 8,
        repeat: -1 // Repetir la animación infinitamente
    });

    scene.anims.create({ //gato sosteniendose//
        key: "sosteniendose",
        frames: scene.anims.generateFrameNumbers(scene.personaje, {
            frames: [11, 12]
        }),
        frameRate: 4,
        repeat: -1 // Repetir la animación infinitamente
    });
}