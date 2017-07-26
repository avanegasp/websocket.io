var express = require('express');
var app = express();

//servidor web EXPRESS
var server = require('http').Server(app);

//servidor socket
var io = require('socket.io')(server);

var messages = [{
  id: 1,
  text:"hola soy un mensaje",
  author: "Angie Vanegas"
}];

app.use(express.static('public'))

// cuando reciba un get en la ruta raíz
app.get('/hello', function(req, res){ //'/hello'se conoce como rutas res
  res.status(200).send('hello world'); // mande un status que todo ha salido bn y que envíe un "hola mundo"
});

// con On escucha el mensaje que llegue de un navegador
//o de otro servidor' connection' y que haga lo que lleva la función
// socket = cliente web que ha mandado el mensaje
// servidor io
io.on('connection', function(socket){
  console.log('Alguien se ha conectado con Socket');
  socket.emit('messages',messages);

// Ahora escucha el nuevo mensaje (on) y recibe unos datos
    socket.on('new-message', function(data){
      messages.push(data);

      io.sockets.emit('messages', messages);
    });
});



//servidor escuchando

server.listen(3000, function() {
    console.log('Servidor corriendo en http://localhost:3000');
});
