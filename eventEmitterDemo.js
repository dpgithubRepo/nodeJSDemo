//@ Durga Prasad
//node js publish -subscribe demo with event emitters


var event = require('events');
var channel = new event.EventEmitter;
var net = require('net');
//channel.on('join',function(){
//console.log('emitter demo. . . ');
//});
//channel.emit('join');

var clients=[];
channel.subscriptions={};

channel.on('join',function(client){
//console.log(id);
var length=clients.length;
clients.push(client);
client.setEncoding('utf8');
})

channel.on('broadcast',function(data){
var length = clients.length;
for(var  i=0;i<length;i++){
//console.log(clients[i])
clients[i].write(data);
}
})

var server=net.createServer(function(socket){
channel.emit('join',socket);
socket.on('data',function(data){
channel.emit('broadcast',data);
})
});

//net.on('data',function(){console.log('on data....');})

server.listen(3000);
