var Player = {
	
	initialize: function (inputSymbol) {
		if (!inputSymbol) {
			this.symbol = "X"; // default symbol = X
		} else {
			this.symbol = inputSymbol;
		};
	}
};
