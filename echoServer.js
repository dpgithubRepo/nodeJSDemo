//@ Durga Prasad
//Echo Server - which will echo the data back - call back/event emitter demo
// how to run - terminal 1 : $  node echoServer.js
// Terminal 2:   $ telnet 127.0.0.1 3000
//then data will be echoed from terminal 2 which ever sent to the server


var net = require('net');
var server=net.createServer(function(socket){
socket.on('data',function(data){socket.write(data)})
} );

server.listen(3000);
