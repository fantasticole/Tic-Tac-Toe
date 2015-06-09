$(document).ready(function(){
	var tally = {
		forX: 0,
		forO: 0
	};

	$('#winner').hide();
	$('#winner').click('disable');

	var xWins = tally.forX;
	var oWins = tally.forO;
	var moves = 1;
	var boxes = [];

	var winners = [
		["1", "2", "3"],
		["4", "5", "6"],
		["7", "8", "9"],
		["1", "4", "7"],
		["2", "5", "8"],
		["3", "6", "9"],
		["1", "5", "9"],
		["3", "5", "7"],
	];

	function setWin(player){
		if (player === 'X'){
			tally.forX++;
			xWins = tally.forX;
		}
		else if (player === 'O'){
			tally.forO++;
			oWins = tally.forO;
		}
	};

	function getPlayerMoves(player, boxes){
		return boxes.filter(function(move){
			return move.player === player;
		}).map(function(move){return move.id});
	};

	// function 

	// winBoxes - xBoxes/oBoxes
	// winXO - html to post ('X Wins!!')
	// winCount - number of wins the player has
	// letterWins - class for the div win tally gets added to.

	function checkWin(player, winBoxes) {
		for (var i = 0; i < winners.length; i++){
			var posArray = winners[i];
			var count = {};
			var quant = [];
			for (var j = 0; j < posArray.length; j++){
				count[posArray[j]] = (count[posArray[j]] || 0) + ($.inArray(posArray[j], winBoxes));
				if (count[posArray[j]] === -1){
					break;
				}
				else {
					quant.push(count[posArray[j]]);
					if (quant.length > 2 && $.inArray(-1, quant) == -1){
						var winArray = posArray;
						return true;
					}
				}
			}
		}
		return false;
	};

  function isSquareAvailable(id) {
    var ids = boxes.map(function(move){return move.id});
    return ids.indexOf(id) === -1;
  };

  function setMove(player, id) {
  	boxes.push({player: player, id: id});
  	console.log(getPlayerMoves(player, boxes));
    interface.setMove(player, id)
  };

  function getBoxId(div){
  	return $(div).attr('id');
  };

  function handleMakeMove() {
  	console.log(isSquareAvailable(getBoxId(this)));
		if (!isSquareAvailable(getBoxId(this))){
			moves = moves;
		}
		else if (moves > 4 && moves % 2 != 0){
		    setMove("X", getBoxId(this));
			interface.setCurrentPlayer("O");
			if (checkWin("X", getPlayerMoves("X", boxes))){
				setWin("X");
				interface.setWin("X", tally)
			}
			moves++;
		}
		else if (moves > 4 && moves % 2 === 0){
		    setMove("O", getBoxId(this));
			interface.setCurrentPlayer("X");
			if (checkWin("O", getPlayerMoves("O", boxes))){
				setWin("O");
				interface.setWin("O", tally)
			}
			moves++;
		}
		else if (moves % 2 != 0){
		    setMove("X", getBoxId(this));
			interface.setCurrentPlayer("O");
			moves++;
		}
		else if (moves % 2 === 0){
		    setMove("O", getBoxId(this));
			interface.setCurrentPlayer("X");
			moves++;
		}
  };

  function resetBoard() {
    var firstPlayerName;

		if ((xWins + oWins) % 2 === 0){
			moves = 1;
			firstPlayerName = "X";
		}
		else {
			moves = 2;
			firstPlayerName = "O";
		}
		boxes = [];

    interface.resetBoard(firstPlayerName);
	}

	$('div').click(handleMakeMove);
	$('button').click(resetBoard);
});
