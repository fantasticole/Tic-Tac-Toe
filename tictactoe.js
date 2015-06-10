$(document).ready(function(){
	var tally = {
		forX: 0,
		forO: 0
	};

	$('#winner').hide();
	$('#winner').click('disable');
	
	var boxes = [];
	var currentPlayer = "X";

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
		}
		else if (player === 'O'){
			tally.forO++;
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

  function otherPlayer(player){
  	var mapping = {"X": "O", "O": "X"};
  	return mapping[player];
  };

  function handleMakeMove() {
  	console.log(isSquareAvailable(getBoxId(this)));
		if (isSquareAvailable(getBoxId(this))){
			setMove(currentPlayer, getBoxId(this));
			interface.setCurrentPlayer(otherPlayer(currentPlayer));
			if (checkWin(currentPlayer, getPlayerMoves(currentPlayer, boxes))){
				setWin(currentPlayer);
				interface.setWin(currentPlayer, tally)
			}
			currentPlayer = otherPlayer(currentPlayer);
		}
  };

  function resetBoard() {

		if ((tally.forX + tally.forO) % 2 === 0){
			currentPlayer = "X";
		}
		else {
			currentPlayer = "O";
		}
		boxes = [];

    interface.resetBoard(currentPlayer);
	}

	$('div').click(handleMakeMove);
	$('button').click(resetBoard);
});
