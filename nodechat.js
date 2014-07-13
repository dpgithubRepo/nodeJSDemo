//@ Durga Prasad
//Tcp Chat Server with Event Emitters


var net = require('net');
var EventEmitter = require('events').EventEmitter;
var channel = new EventEmitter();
var clients=[];

//emit join
channel.on('join',function(socket){
console.log('new client connected....total number of clients '+(clients.length+1));
clients.push(socket);
socket.setEncoding('utf8');
});

//emit end
channel.on('disconnect',function(socket){
clients.splice(clients.indexOf(socket),1);
console.log('client disconnected......no of clients '+clients.length);
});

//emit publish

channel.on('publish',function(data,socket){
     var count =clients.length;
     for(var i=0;i<count;i++){	
		//continue if authored client
            if(clients[i]==socket)continue; 
		clients[i].write(data);
	}
});



//create tcp server
var server=net.createServer(function(socket){
console.log('connection established. . .');
channel.emit('join',socket);

//client disconnecting
socket.on('end',function(socket){
channel.emit('disconnect',socket);
});

//on data from client
socket.on('data',function(data){
channel.emit('publish',data,this)
});

});

server.listen(8000);
