//@ Durga Prasad

var http = require('http');
var url  = require('url');
//array to hold items
var cart =[];
// create http server
	 var httpServer = http.createServer(function(req,res){
			switch(req.method){
			case 'GET' :
                              {
				console.log('GET');
				serveGET(req,res);
				break;
			     }
			case 'POST':
				{
				console.log('POST');
				servePOST(req,res);
				break;
				}
			case 'PUT': 
                                {
                                console.log('PUT');
				servePUT(req,res);
                                break;
                                }
			
			case 'DELETE': 
                                {
                                console.log('DELETE');
				serveDELETE(req,res);
                                break;
                                }

}
			
	});

httpServer.listen(8000);


            //  serve GET
		function serveGET(req,res){
			for(var i=0;i<cart.length;i++){
				res.write( (i+1)+ "- - - > > "+cart[i] +"\n");
			}
			res.end();
		}
	 
          // serve POST
               function servePOST(req,res){
			var cartItem='';
			req.setEncoding('utf8');
			req.on('data',function(chunk){
			cartItem+=chunk;
			});
			
			req.on('end',function(){
                        console.log(" ******  "+cartItem);
			cart.push(cartItem);
			res.statusCode=200;
			res.end('OK \n');
			});
		}

	// serve PUT
                function servePUT(req,res){
                }
         
          // serve DELETE
               function serveDELETE(req,res){
		var delItem = parseInt(url.parse(req.url).pathname.slice(1),10);
		delItem-=1;
		if(isNaN(delItem)){
		   res.statusCode=400;
		   res.end('Item Id to be deleted is invalid');
		}
		else if(!cart[delItem]){
		res.statusCode=404;
		res.end('Item id is not available');
		}
		cart.splice(delItem,1);
		console.log(delItem);
		res.statusCode=200;
		res.end("OK\n");
	            }

