describe("Player", function() {
  describe("initialize", function() {
    it("is initialized with a symbol", function() {
      var testPlayer = Object.create(Player);
      testPlayer.initialize("X");
      testPlayer.symbol.should.equal("X");
    });
  });
}); // end of tests for Player

describe("Space", function() {
  describe("initialize", function() {
    it("is initialized with an x and y coordinate", function() {
      var testSpace = Object.create(Space);
      testSpace.initialize(1, 2);
      testSpace.xCoordinate.should.equal(1);
      testSpace.yCoordinate.should.equal(2);
      testSpace.markedBy.should.equal(0);
      testSpace.isMarked().should.equal(false);
    });
  });

  describe("markBy", function() {
    it("lets a player mark the space", function() {
      var testPlayer = Object.create(Player);
      testPlayer.initialize("X");
      var testSpace = Object.create(Space);
      testSpace.initialize(1, 2);
      testSpace.markBy(testPlayer);
      testSpace.markedBy.symbol.should.equal("X");
    });
  });

}); // end of tests for Space

describe("Board", function() {
  describe("initialize", function () {
    it("is initialized by the creation of a 3 by 3 array of unmarked Spaces setting the number of moves to 0", function () {
      var testBoard = Object.create(Board);
      testBoard.initialize();
      testBoard.boardSpace[1][2].xCoordinate.should.equal(1);
      testBoard.boardSpace[1][2].yCoordinate.should.equal(2);
      testBoard.boardSpace[1][2].markedBy.should.equal(0);
      testBoard.boardSpace[1][2].isMarked().should.equal(false);
      testBoard.numberMoves.should.equal(0);
    });
  });

  describe("takesTurn", function () {
    it("marks the chosen square with the player's symbol if the square has not already been marked and returns true", function () {
      var testBoard = Object.create(Board);
      testBoard.initialize();
      var testPlayer = Object.create (Player);
      testPlayer.initialize("X");
      testBoard.boardSpace[1][2].isMarked().should.equal(false);
      testBoard.takesTurn(testPlayer,1,2).should.equal(true);
      testBoard.boardSpace[1][2].markedBy.symbol.should.equal("X");
      testBoard.boardSpace[1][2].isMarked().should.equal(true);
    });

    it("does nothing if the chosen square has already been marked and returns false", function () {
      var testBoard = Object.create(Board);
      testBoard.initialize();
      var testPlayer1 = Object.create(Player);
      var testPlayer2 = Object.create(Player);
      testPlayer1.initialize("X");
      testPlayer2.initialize("O");
      testBoard.boardSpace[1][2].isMarked().should.equal(false);
      testBoard.takesTurn(testPlayer1,1,2).should.equal(true);
      testBoard.numberMoves.should.equal(1);
      testBoard.lastMoved.should.equal("X");
      testBoard.boardSpace[1][2].markedBy.symbol.should.equal("X");
      testBoard.boardSpace[1][2].isMarked().should.equal(true);
      testBoard.takesTurn(testPlayer2,1,2).should.equal(false);
    });
  });

  describe("gameOver", function () {
    it("returns true if the game is over, and also returns why (Win)", function () {
      var testBoard = Object.create(Board);
      testBoard.initialize();
      var testPlayer = Object.create(Player);
      testPlayer.initialize("X");
      testBoard.boardSpace[0][0].markBy(testPlayer);
      testBoard.boardSpace[0][1].markBy(testPlayer);
      testBoard.boardSpace[0][2].markBy(testPlayer);
      testBoard.gameOver().should.eql([true,"Win","Row","X"]);
    });

    // it("returns true if the game is over, and also returns why (Draw)", function () {
    //   var testBoard = Object.create(Board);
    //   testBoard.initialize();
    //   *** I need to figure out how to create a draw to test this ***
    //   testBoard.gameOver().should.eql([true,"Draw","",""]);
    // });

  });

}); // end of tests for Board
