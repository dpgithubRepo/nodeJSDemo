
//@Durga Prasad
//echo server - echoes back the data sent but for only first time
// how to run : termimal 1 --> node echoServerOneTime.js
// terminal 2 : --> $ telnet 127.0.0.1 3000
// first sent data sent will be echoed back

var net = require('net');

var server = net.createServer(function(socket){
socket.once('data',function(data){socket.write(data)})
})

server.listen(3000);
