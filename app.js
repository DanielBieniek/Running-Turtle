var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

//giving permission to access certain files, namely index.html and whole 'public' folder
app.get('/',function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.use('/public', express.static(__dirname + '/public'));

//-------------CUSTOM FILES---------------------------
eval(fs.readFileSync('game/cards.js')+'');
eval(fs.readFileSync('game/pawn.js')+'');
//-------------CUSTOM FILES---------------------------

createDeck();
shuffleDeck();
shuffleTiles();
var playerList = [];

var redPawn = new Pawn("red");
var greenPawn = new Pawn("green");
var bluePawn = new Pawn("blue");
var yellowPawn = new Pawn("yellow");
var purplePawn = new Pawn("purple");

io.on('connection', function(socket){ //on connection

	socket.on('start', function(){
		if(playerList.length<MAXPLAYERS){
			//assign color to a player
			socket.color = playerTiles.pop();
			playerList.push(socket.color);
			socket.emit('playerColor', socket.color);
			//assign cards to a player
			socket.stack = new Array(NUMBEROFCARDS);
			for(var i=0;i<NUMBEROFCARDS;i++){
				socket.stack[i] = deck.pop(); //takes the cards from the shuffled deck and puts it into player's card stack
				socket.emit('take card',socket.stack,i); //draw the card
				checkDeck(); //check if any card is left
			}
			console.log(socket.color + ' connected');
		}
	});

	socket.on('disconnect', function(){ //on disconnection
		if(socket.color){
			playerList.splice(playerList.indexOf(socket.color),1); //delete the player from the list
			playerTiles.push(socket.color); //give the color back to be avaiable
			shuffleTiles();
			console.log(socket.color + ' disconnected');
		};
		if(socket.stack){
			for(var i=0;i<NUMBEROFCARDS;i++){
				throwAway.push(socket.stack[i]); //put the cards of a disconnected user to a throwaway pile
				checkDeck(); //check if there's any card left
			}
		};
	});


	function updatePawns() {
		socket.emit('delete pawns');
		socket.emit('draw pawn', redPawn);
		socket.emit('draw pawn', greenPawn);
		socket.emit('draw pawn', bluePawn);
		socket.emit('draw pawn', yellowPawn);
		socket.emit('draw pawn', purplePawn);
		
		socket.broadcast.emit('delete pawns');
		socket.broadcast.emit('draw pawn', redPawn);
		socket.broadcast.emit('draw pawn', greenPawn);
		socket.broadcast.emit('draw pawn', bluePawn);
		socket.broadcast.emit('draw pawn', yellowPawn);
		socket.broadcast.emit('draw pawn', purplePawn);
	}
	updatePawns();

	socket.on('use card', function(i){
		console.log(socket.color + ' played ' + socket.stack[i].displayInPrompt() + ' card.');
		choosePawn(socket.stack[i].color, socket.stack[i].value); //updates the level of a pawn
		updatePawns(); //redraw the pawns
		socket.broadcast.emit('add to throwAway', socket.stack[i].color, socket.stack[i].value); //show used card to other players
		socket.emit('add to throwAway', socket.stack[i].color, socket.stack[i].value); //show used card
		throwAway.push(socket.stack[i]); //put the card to throwaway stack
		socket.stack[i] = deck.pop(); //take one card
		socket.emit('take card',socket.stack,i); //draw drawn card
		checkDeck(); //keep checking if there's still cards to draw from
	});


	function choosePawn(color, value) {
		if(value < 3) {
			switch(color) {
				case "red":
					redPawn.move(value);
					break;
				case "green":
					greenPawn.move(value);
					break;
				case "blue":
					bluePawn.move(value);
					break;
				case "yellow":
					yellowPawn.move(value);
					break;
				case "purple":
					purplePawn.move(value);
					break;
			}
		}
	}

});

http.listen(3000, function(){ //start local server
	console.log("listening on localhost:3000...");
	console.log("changed");
});
/* socket.emit('eventName', value); */
/* socket.on('eventName', function(varName){
	//CODE
}); */