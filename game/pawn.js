function Pawn(color) {
	this.color = color;
	this.level = 0;
	this.below = 0;
	this.above = 0;

	this.move = function(step) {
		var nextLevel = this.level+step;
		if(nextLevel>-1 && nextLevel<10){
			this.level = nextLevel;
		}
	}
}

/* socket.emit('eventName', value); */
/* socket.on('eventName', function(varName){
	CODE
}); */