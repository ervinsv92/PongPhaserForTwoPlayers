class Bootloader extends Phaser.Scene{
    constructor(){
        super({key:"Bootloader"});
    }

    preload(){
        this.load.on("complete", ()=>{
            this.scene.start("Scene_SalaEspera");
        });
        
        this.load.image("ball","/src/assets/ball.png");
        this.load.image("izquierda","/src/assets/left_pallete.png");
        this.load.image("derecha","/src/assets/right_pallete.png");
        this.load.image("separador","/src/assets/separator.png");
    }

    create(){
        this.socket = io();
        let self = this;
        
        // this.socket.on('newPlayer', function (playerId) {
        //     console.log('front conectado')
        //     self.registry.events.emit('jugadorNuevo', playerId);
        // })
        this.registry.events.on('[boot] startGame',()=>{
            self.socket.emit('startGame')
        });

        this.registry.events.on('[boot] playerMovement',(data)=>{
            self.socket.emit('playerMovement', data)
        });

        this.registry.events.on('[boot] getAngle',(data)=>{
            self.socket.emit('getAngle', data)
        });

        this.socket.on('currentPlayers', function (players) {
            //console.log('current bootloader: ', players)
            self.registry.events.emit('[Sala espera] currentPlayers', players);
        })

        this.socket.on('startGame', function (players) {
            //console.log('current bootloader: ', players)
            self.registry.events.emit('[Sala espera] startGame', players);
        })

        this.socket.on('idPlayer', function (idPlayer) {
            //console.log('current bootloader: ', players)
            self.registry.events.emit('[Sala espera] idPlayer', idPlayer);
        })

        this.socket.on('playerMoved', function (data) {
            //console.log('current bootloader: ', players)
            self.registry.events.emit('[Play] playerMovement', data);
        })

        this.socket.on('getAngle', function (data) {
            //console.log('current bootloader: ', players)
            self.registry.events.emit('[Play] getAngle', data);
        })
    }
}

export default Bootloader;