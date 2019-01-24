$(function () {
	var socket = io();
	function switchColor(color) { //changes the value of a color to a class name
		switch(color) {
			case "red":
				return "card redCard";
			case "green":
				return "card greenCard";
			case "blue":
				return "card blueCard";
			case "yellow":
				return "card yellowCard";
			case "purple":
				return "card purpleCard";
			case "rainbow":
				return "card rainbowCard";
			default:
				return "card hiddenCard";
		}
	}
	function switchColorThrowaway(color) { //changes the value of a color to a class name for throwaway cards
		switch(color) {
			case "red":
				return "redCard";
			case "green":
				return "greenCard";
			case "blue":
				return "blueCard";
			case "yellow":
				return "yellowCard";
			case "purple":
				return "purpleCard";
			case "rainbow":
				return "rainbowCard";
			default:
				return "hiddenCard";
		}
	}
	function switchValue(value) { //represents the value as a sign on the card
		switch(value) {
			case -1:
				return "-";
			case 1:
				return "+";
			case 2:
				return "++";
			case 3:
				return "^";
			case 4:
				return "^^";
			default:
				return "?";
		}
	}
	socket.on('playerColor', function(color){ //changes the 'playerColor' bar depending on the value
		var colorCode = "";
		switch(color) {
			case "red":
				colorCode = "#d63031";
				break;
			case "green":
				colorCode = "#55efc4";
				break;
			case "blue":
				colorCode = "#74b9ff";
				break;
			case "yellow":
				colorCode = "#fdcb6e";
				break;
			case "purple":
				colorCode = "#8e44ad";
				break;
			default:
				colorCode = "#000000";
		}
		document.getElementById('playerColor').style.backgroundColor = colorCode;
	});
	socket.on('take card', function(stack, index){ //draws the card on the screen
		document.getElementById('c'+index).className = switchColor(stack[index].color);
		document.getElementById('c'+index).innerHTML = switchValue(stack[index].value);
	}); 
	socket.on('add to throwAway', function(color, value){ //draws the throwaway card on the screen
		document.getElementById('throwAway').className = switchColorThrowaway(color);
		document.getElementById('throwAway').innerHTML = switchValue(value);
	});
	document.getElementById('playerColor').onclick = function() { //hides player color if clicked
		document.getElementById('playerColor').classList.toggle("hidePlayer");
	};
	document.getElementById('startButton').onclick = function() { //gives the player a pawn color and cards 
		document.getElementById('overlay').style.display = "none";
		socket.emit('start');
	};
	//uses a card
	document.getElementById('c0').onclick = function() {
		socket.emit('use card', 0);
	};
	document.getElementById('c1').onclick = function() {
		socket.emit('use card', 1);
	};
	document.getElementById('c2').onclick = function() {
		socket.emit('use card', 2);
	};
	document.getElementById('c3').onclick = function() {
		socket.emit('use card', 3);
	};
	document.getElementById('c4').onclick = function() {
		socket.emit('use card', 4);
	};
	socket.on('draw pawn', function(pawn){
		var id = (pawn.color+"Pawn");
		var pawnDiv = document.createElement("div");
		document.getElementById('p'+pawn.level).appendChild(pawnDiv);
		pawnDiv.className = "pawn";
		pawnDiv.id = id;
	});
	socket.on('delete pawns', function(){
		$('.pawn').remove();
	});
});
/* socket.emit('eventName', value); */
/* socket.on('eventName', function(varName){
	CODE
}); */