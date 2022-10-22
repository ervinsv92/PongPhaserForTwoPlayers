class Scene_SalaEspera extends Phaser.Scene{
    constructor(){
        super({key:"Scene_SalaEspera"});
    }

    preload(){
        this.cantidadJugadores = 0;
    }   

    create(){
        this.idJugador1 = '';
        this.idJugador2 = '';
        this.idPlayer = '';
        this.add.text(20,20,'Sala de espera',{color:'#fff', fontSize:30});
        this.player1 = this.add.text(20,100,'Jugador 1',{color:'#fff', fontSize:30});
        this.player2 = this.add.text(20,160,'Jugador 2',{color:'#fff', fontSize:30});
        this.esperando = this.add.text(20,260,`Esperando jugadores ${this.cantidadJugadores}/2`,{color:'#fff', fontSize:30});

        this.continuar = this.add.text(20,300,`Preciona la tecla espacio para continuar`,{color:'#fff', fontSize:20});
        this.continuar.setVisible(false);

        this.input.keyboard.on("keydown-SPACE", ()=>{
            if(this.cantidadJugadores == 2){
                this.registry.events.emit('[boot] startGame');
            }
        });

        this.registry.events.on('[Sala espera] startGame',(jugadores)=>{
            //console.log('start game: ', jugadores.jugador1, jugadores.jugador2, jugadores)
            this.scene.start('Scene_play', {
                idPlayer: this.idPlayer,
                jugador1: jugadores.jugador1
            });
        });

        this.registry.events.on('[Sala espera] idPlayer',(idPlayer)=>{
            this.idPlayer = idPlayer;
            console.log('Id player: ',idPlayer)
        });

        //Crea un evento y lo coloca en escucha, puede ser accedido por otras escenas
        this.registry.events.on('[Sala espera] currentPlayers',(jugadores)=>{

            
                this.idJugador1 = jugadores.jugador1;
                this.player1.setText(`Jugador 1: ${jugadores.jugador1}`)
           
                this.idJugador2 = jugadores.jugador2;
                this.player2.setText(`Jugador 2: ${jugadores.jugador2}`)

                let contador = 0;
                if(jugadores.jugador1 != '') contador++;
                if(jugadores.jugador2 != '') contador++;
                this.cantidadJugadores = contador;
                console.log('cantidad jugadores: ',this.cantidadJugadores)
                this.esperando.setText(`Esperando jugadores ${this.cantidadJugadores}/2`);
                this.continuar.setVisible(this.cantidadJugadores==2);

            //console.log('jugadores: ', jugadores)
            //puede ir sin parametros
            //console.log(`Evento cambio: ${idJugador}`)
            
        });
    }

    update(){

    }
}

export default Scene_SalaEspera;