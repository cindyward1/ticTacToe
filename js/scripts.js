var Player = {
	
	initialize: function (inputSymbol) {

		if (!inputSymbol) {
			this.symbol = "X"; // default symbol = X if no input
		} else {
			this.symbol = inputSymbol;
		};
	}
};

var Space = {

	initialize: function (inputXCoordinate, inputYCoordinate) {

		if (!inputXCoordinate) {
			this.xCoordinate = 0; // default xCoordinate to 0 if no input
		} else {
			this.xCoordinate = inputXCoordinate;
		};

		if (!inputYCoordinate) {
			this.yCoordinate = 0; // default xCoordinate to 0 if no input
		} else {
			this.yCoordinate = inputYCoordinate;
		};
	}, // end of function Space.initialize

	markBy : function (activePlayer) {

		this.markedBy = activePlayer;
		
	} // end of function Space.markBy
};