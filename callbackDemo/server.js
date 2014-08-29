//@ Durga Prasad

// Call back demo using http & fs modules of nodejs

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req,res){sample(req,res)});

function sample(request,response){
console.log(request.url);
if(request.url='/'){
  fs.readFile('./titles.json',function(err,data){
  if(err){
         console.log('titles json file not found or not readable');
		response.end('SERVER ERROR');
	}else{

         console.log(JSON.parse(data));
	buildHTML(JSON.parse(data),request,response);
    }
});
}

}


function buildHTML(titles,request,response){
var htmlString;
fs.readFile('./template.html',function(err,data){
  if(err){
   console.log('error reading the template html file');
   server.end('SERVER ERROR');
  }else{
   htmlString = data.toString();
  var finalHTML = htmlString.replace('%',titles.join('<li></li>'));
  response.end(finalHTML);
}

})

}

server.listen(3000);
