const express = require('express')
const http = require('http')
const path = require('path')
const socketIO = require('socket.io')

const app = express()
var server = http.Server(app)
var io = socketIO(server, {
  pingTimeout: 60000,
})

app.set('port', 5000)
app.use('/src', express.static(__dirname + '/src'))
app.use('/node_modules', express.static(__dirname + '/node_modules'))

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'index.html'))
})

server.listen(5000, function () {
  console.log('Starting server on port 5000')
})

let players = {
    jugador1:'',
    jugador2:''
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

io.on('connection', function (socket) {
  console.log('player [' + socket.id + '] connected')

    if(players.jugador1 == ''){
        players.jugador1 = socket.id;
    }else{
        players.jugador2 = socket.id;
    }
    

  io.emit('currentPlayers', players)
  socket.emit('idPlayer', socket.id);
 
  socket.on('startGame',function(){
    console.log("startGame")
    io.emit('startGame', players)
  })  

  socket.on('getAngle',function(){
    let angle = getRandomInt(-120,120)
    io.emit('getAngle', angle)
  })  

  socket.on('disconnect', function () {
    console.log('player [' + socket.id + '] disconnected')
    if(players.jugador1 == socket.id){
        players.jugador1 = '';
    }else{
        players.jugador2 = '';
    }
    io.emit('currentPlayers', players)
    //io.emit('playerDisconnected', socket.id)
  })

  socket.on('playerMovement', function (movementData) {
    //console.log(movementData)
    socket.broadcast.emit('playerMoved', movementData)
  })
})