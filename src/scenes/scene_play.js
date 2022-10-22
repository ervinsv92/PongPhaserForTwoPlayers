import Palas from '../gameObjects/palas.js';

class Scene_play extends Phaser.Scene{
    constructor(){
        super({key:"Scene_play"});
    }

    init(data){
        this.data.set('idPlayer',data.idPlayer);
        this.data.set('jugador1',data.jugador1);
        //console.log('init :',idPlayer)
        console.log(data.idPlayer == data.jugador1?'Soy el uno':'Soy el dos', data.idPlayer, data.jugador1)
    }

    preload(){
        this.idPlayer = this.data.get('idPlayer');
        this.jugador1 = this.data.get('jugador1');
    }

    create(){
        console.log('game player id: ', this.idPlayer)
        let center_width = this.sys.game.config.width/2;
        let center_height = this.sys.game.config.height/2;
        //Separador
        this.add.image(center_width,center_height,"separador");

        //Palas
        //this.izquierda = this.add.image(30,center_height,"izquierda");
        this.izquierda = new Palas(this, 30, center_height, "izquierda");
        //this.derecha = this.add.image(this.sys.game.config.width-30,center_height,"derecha");
        this.derecha =  new Palas(this, this.sys.game.config.width-30, center_height, "derecha");

        //Bola
        this.physics.world.setBoundsCollision(false, false, true, true);
        this.ball = this.physics.add.image(center_width, center_height, "ball");
        this.ball.setCollideWorldBounds(true);
        this.ball.setBounce(1);
        this.ball.setVelocityX(-180);

        if(this.idPlayer == this.jugador1){
            //Fisicas
            this.physics.add.collider(this.ball, this.izquierda, this.chocaPala,null, this);
            this.physics.add.collider(this.ball, this.derecha, this.chocaPala,null, this);
        }        

        //Controles
        //Pala derecha
        this.cursor = this.input.keyboard.createCursorKeys();
        //Pala izquierda
        this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.registry.events.on('[Play] playerMovement',(data)=>{
            //self.socket.emit('playerMovement', data)
            //console.log("movimiento derecha: ",data)
            if(this.idPlayer == this.jugador1){
                this.derecha.body.setVelocityY(data.v)
            }else{
                this.izquierda.body.setVelocityY(data.v)
            }
        });

        this.registry.events.on('[Play] getAngle',(data)=>{
            //self.socket.emit('playerMovement', data)
            //console.log("movimiento derecha: ",data)
            //this.derecha.body.setVelocityY(data.v)
            this.ball.setVelocityY(data);
        });

        this.registry.events.on('[Play] ballMovement',(data)=>{
            //self.socket.emit('playerMovement', data)
            //console.log("movimiento derecha: ",data)
            //this.derecha.body.setVelocityY(data.v)
            //this.ball.setVelocityY(data);
            if(this.idPlayer != this.jugador1){
                this.ball.x = data.x;
                this.ball.y = data.y;
            }
        });
    }

    update(){
        if(this.idPlayer == this.jugador1){
            if(this.ball.x < 0 || this.ball.x > this.sys.game.config.width){
                this.ball.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
                this.ball.setVelocityX(-180);
            }
        }
        
        //Control de las palas
        //Pala derecha
        // if(this.cursor.down.isDown){
        //     this.derecha.body.setVelocityY(300);
        // }else if(this.cursor.up.isDown){
        //     this.derecha.body.setVelocityY(-300);
        // }else{
        //     this.derecha.body.setVelocityY(0);
        // }

        //Pala izquierda
        if(this.cursor_S.isDown){
            if(this.idPlayer == this.jugador1){
                this.izquierda.body.setVelocityY(300);
            }else{
                this.derecha.body.setVelocityY(300);
            }
        }else if(this.cursor_W.isDown){
            if(this.idPlayer == this.jugador1){
                this.izquierda.body.setVelocityY(-300);
            }else{
                this.derecha.body.setVelocityY(-300);
            }
        }else{
            if(this.idPlayer == this.jugador1){
                this.izquierda.body.setVelocityY(0);
            }else{
                this.derecha.body.setVelocityY(0);
            }
        }
        //console.log('antes velocity: ', this.izquierda.oldVelocity, this.izquierda.body.velocity.y)
        
        // if(!this.izquierda.oldVelocity && (this.izquierda.oldVelocity != this.izquierda.body.velocity.y)){
        //     //console.log('dif velocity: ', this.izquierda.oldVelocity, 'y -> ',this.izquierda.body.velocity.y)
        //     //this.izquierda.oldVelocity = this.izquierda.body.velocity.y;
        //     this.registry.events.emit('[boot] playerMovement', {
        //         idPlayer:this.idPlayer,
        //         v:this.izquierda.body.velocity.y
        //     });
        // }
        this.registry.events.emit('[boot] playerMovement', {
            idPlayer:this.idPlayer,
            v: this.idPlayer == this.jugador1?this.izquierda.body.velocity.y:this.derecha.body.velocity.y
        });

        if(this.idPlayer == this.jugador1){
            this.registry.events.emit('[boot] ballMovement', {
                x:this.ball.x,
                y:this.ball.y
            });
        }
        //console.log('velocity: ', this.izquierda.oldVelocity, this.izquierda.body.velocity.y)
    }

    chocaPala(){
        //this.registry.events.emit('[boot] getAngle');
        this.ball.setVelocityY(Phaser.Math.Between(-120,120));
    }
}

export default Scene_play;