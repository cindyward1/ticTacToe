var Player = {
	
	initialize: function (inputSymbol) {

		if (!inputSymbol) { this.symbol = "X"; } // default symbol = X if no input
		else { this.symbol = inputSymbol; };

	} // end of function Player.initialize
}; // end of prototype Player


var Space = {

	initialize: function (inputXCoordinate, inputYCoordinate) { // initializes new Space object

		if (!inputXCoordinate) { this.xCoordinate = 0; } // defaults xCoordinate to 0 if no input
		else { this.xCoordinate = inputXCoordinate; };

		if (!inputYCoordinate) { this.yCoordinate = 0; } // defaults xCoordinate to 0 if no input
		else { this.yCoordinate = inputYCoordinate; };

		this.markedBy = 0; // initializes markedBy to 0 so isMarked will return false

	}, // end of function Space.initialize

	isMarked : function () { // boolean to determine if Space object has already been marked

		if (!this.markedBy) { return false; } // space still has its initialized value of 0
		else { return true; }; // otherwise it has been marked by a player

	}, // end of function Space.isMarked

	markBy : function (activePlayer) { // mark Space object with Player object if it hasn't already been marked

		if (!this.isMarked())
			this.markedBy = activePlayer;

	} // end of function Space.markBy

}; // end of prototype Space


var Board = {

	initialize: function () { // for loop sets up a 3 x 3 array of Spaces to represent the board, and initializes each with its X and Y coordinates

		this.boardSpace = [[0,0,0],[0,0,0],[0,0,0]]; // sets up an empty 3 x 3 board array (gets a mocha error if this is not done)

		for (var indexXAxis = 0; indexXAxis < 3; indexXAxis++) { // initializes each Space object in 3 x 3 array
			for (var indexYAxis = 0; indexYAxis < 3; indexYAxis++) {
				this.boardSpace[indexXAxis][indexYAxis] = Object.create(Space);
				this.boardSpace[indexXAxis][indexYAxis].initialize(indexXAxis,indexYAxis);
			};
		};

	} // end of function Board.initialize

}; // end of prototype Board
