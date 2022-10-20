import Bootloader from "./bootloader.js";
import Scene_play from "./scenes/scene_play.js";
import Scene_SalaEspera from "./scenes/scene_sala_espera.js";

const config = {
    width:640,
    height:400,
    parent:"contenedor",
    physics:{
        default:"arcade"
    },
    scene:[
        Bootloader,
        Scene_play,
        Scene_SalaEspera
    ]
}

new Phaser.Game(config);