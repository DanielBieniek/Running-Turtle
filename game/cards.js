var deck = []; //array of cards to draw from
var throwAway = []; //array of used cards
var cardColors = ["red", "green", "blue", "yellow", "purple", "rainbow"];
var playerTiles = ["red", "green", "blue", "yellow", "purple"];
var MAXPLAYERS = playerTiles.length;
var NUMBEROFCARDS = 5;

function Card(cardColorsIndex,value) {
	this.color = cardColors[cardColorsIndex]; //red, green, blue, yellow, purple, rainbow
	this.value = value; // -=-1, +=1, ++=2, ^=3, ^^=4
	this.displayInPrompt = function() {
		switch(value) {
			case -1:
				return ("- " + this.color);
			case 1:
				return ("+ " + this.color);
			case 2:
				return ("++ " + this.color);
			case 3:
				return ("^ " + this.color);
			case 4:
				return ("^^ " + this.color);
			default:
				return ("???");
		}
	}
}

function createDeck() {
	for(var i=0;i<5;i++){ //for each color, but rainbow
		for(var j=0;j<2;j++){
			deck.push(new Card(i, -1)); //create 2 "-" cards
		}
		for(var j=0;j<5;j++){
			deck.push(new Card(i, 1)); //create 5 "+" cards
		}
		deck.push(new Card(i, 2)); //create 1 "++" card
	}
	for(var j=0;j<2;j++){ //rainbow cards
		deck.push(new Card(5, -1)); //create 2 "-" cards
	}
	for(var j=0;j<5;j++){
		deck.push(new Card(5, 1)); //create 5 "+" cards
	}
	for(var j=0;j<3;j++){
		deck.push(new Card(5, 3)); //create 3 "^" cards
	}
	for(var j=0;j<2;j++){
		deck.push(new Card(5, 4)); //create 2 "^^" cards
	} //total of 52 cards
}
function shuffleDeck() {
	for(var i=0;i<50;i++){ //randomly shuffle the deck 50 times
		deck.sort(function(a, b){return 0.5 - Math.random()});
	};
}
function shuffleTiles() {
	for(var i=0;i<50;i++){ //randomly shuffle the tiles 50 times
		playerTiles.sort(function(a, b){return 0.5 - Math.random()});
	};
}
function checkDeck() {
	if(deck.length < 1) {
		while(throwAway.length) {
			deck.push(throwAway.pop());
		};
		shuffleDeck();
	};
}
/* socket.emit('eventName', value); */
/* socket.on('eventName', function(varName){
	CODE
}); */