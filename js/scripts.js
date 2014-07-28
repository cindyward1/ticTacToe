var Player = {
	
	initialize: function (inputSymbol, inputName) {

		if (!inputSymbol) { this.symbol = "X"; } // default symbol = X if no input
		else { this.symbol = inputSymbol; };

		this.playerName = inputName;

	} // end of function Player.initialize

}; // end of prototype Player


var Space = {

	initialize: function (inputXCoordinate, inputYCoordinate) { // initializes new Space object

		this.xCoordinate = inputXCoordinate;
		this.yCoordinate = inputYCoordinate;
		this.markedBy = "X"; // initializes markedBy to 0 so isMarked will return false

		$("img.square" + inputXCoordinate + inputYCoordinate).click (function (lockedXCoordinate, lockedYCoordinate, markedBy) {
     		return function (event) {
       			event.preventDefault();
       			alert("space clicked = " + lockedXCoordinate + ", " + lockedYCoordinate);
        		$(".square" + lockedXCoordinate + lockedYCoordinate + "-span").html("<img src='./img/scrabble-" + markedBy + 
        		  "-tile.png' class='square" + lockedXCoordinate + lockedYCoordinate + "'>");
        		$("img.square" + lockedXCoordinate + lockedYCoordinate).off ("click");
     		};
     	} (inputXCoordinate, inputYCoordinate, this.markedBy)); // immediately invoked function expression

	}, // end of function Space.initialize

	isMarked : function () { // boolean to determine if Space object has already been marked

		if (!this.markedBy) { return false; } // space still has its initialized value of 0
		else { return true; }; // otherwise it has been marked by a player

	}, // end of function Space.isMarked

	markBy : function (activePlayer) { // mark Space object with Player object if it hasn't already been marked

		this.markedBy = activePlayer;

	} // end of function Space.markBy

}; // end of prototype Space


var Board = {

	initialize: function () { // initializes new Board object

		this.numberMoves = 0;
		this.lastMoved = "";

		this.boardSpace = [[0,0,0],[0,0,0],[0,0,0]]; // sets up an empty 3 x 3 board array (error occurs if this statement is omitted)
		for (var indexXAxis = 0; indexXAxis < 3; indexXAxis++) { // initializes each Space object in 3 x 3 array
			for (var indexYAxis = 0; indexYAxis < 3; indexYAxis++) {
				this.boardSpace[indexXAxis][indexYAxis] = Object.create(Space);
				this.boardSpace[indexXAxis][indexYAxis].initialize(indexXAxis,indexYAxis);
			};
		};

	}, // end of function Board.initialize

	takesTurn: function (activePlayer, inputXCoordinate, inputYCoordinate) { // the activePlayer takes a turn

		var currentSquare = this.boardSpace[inputXCoordinate][inputYCoordinate];
		if (!currentSquare.isMarked()) { // square is not marked so mark chosen square with activePlayer's symbol
			currentSquare.markBy(activePlayer); 
			this.lastMoved = activePlayer.symbol;
			this.numberMoves++;
			return true;
		} else { return false; }; // square is marked, activePlayer needs to choose again

	}, // end of function Board.takesTurn

	gameOver: function () { // analyzes if the game is over

		for (var indexXAxis = 0; indexXAxis < 3; indexXAxis++) { // check the rows for a win
			if ((this.boardSpace[indexXAxis][0].markedBy.symbol === this.boardSpace[indexXAxis][1].markedBy.symbol) &&
			   (this.boardSpace[indexXAxis][1].markedBy.symbol === this.boardSpace[indexXAxis][2].markedBy.symbol)) {
			   	return [true,"Win","Row",this.boardSpace[indexXAxis][0].markedBy.symbol];   	
			   	break;
			};
		};

		for (var indexYAxis =  0; indexYAxis < 3; indexYAxis++) { // check the columns for a win
			if ((this.boardSpace[0][indexYAxis].markedBy.symbol === this.boardSpace[1][indexYAxis].markedBy.symbol) &&
			   (this.boardSpace[1][indexYAxis].markedBy.symbol === this.boardSpace[2][indexYAxis].markedBy.symbol)) {
			   	return [true,"Win","Col",this.boardSpace[0][indexYAxis].markedBy.symbol];   	
			   	break;
			};
		};

		if ((this.boardSpace[0][0].markedBy.symbol === this.boardSpace[1][1].markedBy.symbol) && // check the subtractive diagonal for a win
		   (this.boardSpace[1][1].markedBy.symbol === this.boardSpace[2][2].markedBy.symbol)) {
		   	return [true,"Win","Diag",this.boardSpace[0][0].markedBy.symbol];
		};

		if ((this.boardSpace[0][2].markedBy.symbol === this.boardSpace[1][1].markedBy.symbol) && // check the additive diagonal for a win
		   (this.boardSpace[1][1].markedBy.symbol === this.boardSpace[2][0].markedBy.symbol)) {
		   	return [true,"Win","Diag",this.boardSpace[0][0].markedBy.symbol];
		};

		if (this.numberMoves === 9) { return [true,"Draw","",""] } // If there have been 9 moves, all of the squares have been marked
		else {return [false,"Continue","Play",this.lastMoved]; }; // otherwise there are still squares to mark and who moved last

	}

}; // end of prototype Board


$(document).ready (function () {


	$("form#enter-names-form").submit (function (event) {

		event.preventDefault();

		function flashGameOver() { // set up callback function to fade the "game over" image in and out when the game is over
 			$("#game-over-image").animate({opacity: 0}).delay(500).animate({opacity: 1}).delay(500);
		};

		var player1Name = $("input#player1-name").val();
		var player2Name = $("input#player2-name").val();

		var firstPlayerName = player1Name; // initially set first player to be Player 1
		var secondPlayerName = player2Name;
		var firstPlayerChoice = Math.round(Math.random()); // random creates a random number between 0.0 and 1.0; round produces either 0 or 1
		if (!firstPlayerChoice) {
			firstPlayerName = player2Name;
		 	secondPlayerName = player1Name; 
		}; // if random number rounds to 0, first player is Player 2

		$(".first-player-name").text(firstPlayerName);
		$(".second-player-name").text(secondPlayerName);

		var firstPlayer = Object.create (Player);
		firstPlayer.initialize ("X", firstPlayerName);
		var secondPlayer = Object.create (Player);
		secondPlayer.initialize ("O", secondPlayerName);

		$(".player-your-move").text(firstPlayerName);

		$("#enter-names-div").hide();
		$("#show-names-div").show();

		theBoard = Object.create(Board);
		theBoard.initialize();







		// setInterval(flashGameOver,2000);

	});
});
