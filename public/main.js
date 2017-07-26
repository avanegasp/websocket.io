//LADO CLIENTE

// io=libreria sockets.io de parte del cliente
//connect = método para que se conecte a un servidor de sockets que en este caso es node
 // que esta corriendo en el localhost 3000
var socket = io.connect('http://localhost:3000',{'forceNew': true});


//cuando reciba el evento 'message' imprima los datos del servidor
socket.on('messages', function(data){
  console.log(data);
  render(data);
})

function render(data){
  var html = data.map(function(elem, index){
    return(
       `<div>
          <strong>${elem.author}</strong>;
          <em>${elem.text}</em>
          </div>`);
  }).join(" ")

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e){
  var payload = {
    author: document.getElementById('username').value,
    text: document.getElementById('text').value
  };

// el cliente emite el evento 'new-message' y le pasa como dato el payload y se debe escuchar en el servidor
  socket.emit('new-message', payload)
    return false
}
