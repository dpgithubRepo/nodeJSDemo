//@ Durga Prasad
//buffering request body string
// body sent in post will be appended to the cartItem and when the data is done it will be pushed to collection
// get lists the items from the collection

var http = require('http');
var cart=[];
var server = http.createServer(function(req,res){
			switch (req.method){
				case 'POST':
				 var cartItem='';
				 req.setEncoding('utf8');
				req.on('data',function(chunk){cartItem+=chunk;});
				req.on('end',function(){cart.push(cartItem)});
				res.end("OK")
                                break;
				case 'GET':
                                 for(var i=0;i<cart.length;i++){
					res.write(cart[i] +"\n");
				}
				res.end();
                                break;
				}
		});
server.listen(3000);
