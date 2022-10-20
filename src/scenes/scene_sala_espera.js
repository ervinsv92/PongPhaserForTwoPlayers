class Scene_SalaEspera extends Phaser.Scene{
    constructor(){
        super({key:"Scene_SalaEspera"});
    }

    preload(){
        this.cantidadJugadores = 0;
    }   

    create(){
        this.add.text(20,20,'Sala de espera',{color:'#fff', fontSize:30});
        this.player1 = this.add.text(20,100,'Jugador 1',{color:'#fff', fontSize:30});
        this.player2 = this.add.text(20,160,'Jugador 2',{color:'#fff', fontSize:30});
        this.esperando = this.add.text(20,260,`Esperando jugadores ${1}/2`,{color:'#fff', fontSize:30});

        this.continuar = this.add.text(20,300,`Preciona la tecla espacio para continuar`,{color:'#fff', fontSize:20});

        this.input.keyboard.on("keydown-SPACE", ()=>{
                
        });
    }

    update(){

    }
}

export default Scene_SalaEspera;