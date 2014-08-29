//@ Durga Prasad
// extending event emiiter to watch file changes


//constructor
function FileWatcher(inputDir,outputDir){
this.inputDir=inputDir;
this.outpuDir=outputDir;
}


//required modules
var fs= require('fs');
var util = require('util');
var events = require('events');
// input directory - do create one while trying this nodejs
var inputDir ='./inp';

//output directory - do create one while trying this nodejs
var outputDir ='./outp';



//inherit the EventEmitter function to the FileWatcher
util.inherits(FileWatcher,events.EventEmitter);

//extending event Emitter
FileWatcher.prototype.watch =function(){
var fileWatcher=this;
fs.readdir(this.inputDir,function(err,files){
if(err) throw err;
for(var index in files){
console.log('files'+index);
fileWatcher.emit('process',files[index]);
}

});
}

//extend Event Emitter
FileWatcher.prototype.start = function(){
var fileWatcher=this;
fs.watchFile(inputDir,function(){
fileWatcher.watch();
});

}


var fileWatch = new FileWatcher(inputDir,outputDir);
fileWatch.on('process',function(file){
console.log('processing. . . .');
var inpFile = this.inputDir+ '/' +file;
var outFile =this.outputDir+'/' +file;
fs.rename(inpFile,outFile, function(err){
if(err) 
console.log( err);
});
});

fileWatch.start();
