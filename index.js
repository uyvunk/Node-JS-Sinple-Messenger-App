var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var sockets = [];
app.get('/', function(req, res){
  	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection',function(socket){
	sockets.push(socket);
	console.log('connect to socket:'+socket.id);
	console.log('size sockets:'+sockets.length);
	socket.on('chat message', function(msg){
	console.log('reveive msg');
	io.emit('chat message', msg);
	});

	socket.on('disconnect',function(){
	console.log('deleted socket:'+socket.id);
	console.log('disconnect');
	var i = sockets.indexOf(socket);
	sockets.splice(i,1);
	console.log('size of sockets:'+sockets.length);
	});
});


http.listen(3000, function(){
  	console.log('listening on *:3000');
});
