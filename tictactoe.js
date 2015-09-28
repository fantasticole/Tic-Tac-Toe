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
	var xBoxes = [];
	var oBoxes = [];

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

	function youWon(winXO, winCount, letterWins) {
		$('#winner').html(winXO);
		$('#winner').show();
		if (winCount == tally.forX){
			tally.forX++;
			xWins = tally.forX;
			$(letterWins).html(tally.forX);
		}
		else if (winCount == tally.forO){
			tally.forO++;
			oWins = tally.forO;
			$(letterWins).html(tally.forO);
		}
		$('.who').hide();
		$('div').css('pointer-events', 'none');
	};

	function checkWin(winBoxes, winXO, winCount, letterWins) {
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
						youWon(winXO, winCount, letterWins);
					}
				}
			}
		}
	};

  function isSquareAvailable(div) {
    return $(div).hasClass('xgo') || $(div).hasClass('ogo');
  };

  function setMove(player, div) {
    if (player === "X") {
		  $(div).addClass('xgo'); // todo: change for state changing code
		  xBoxes.push($(div).attr('id'));
    } else if (player === "O") {
		  $(div).addClass('ogo'); // todo: change for state changing code
		  oBoxes.push($(div).attr('id'));
    }
  };

  function handleMakeMove() {
		if (isSquareAvailable(this)){
			moves = moves;
		}
		else if (moves > 4 && moves % 2 != 0){
      makeMove("X", this);
			interface.setCurrentPlayer("O");
			checkWin(xBoxes, "X Wins!!", xWins, '.xwins');
			moves++;
		}
		else if (moves > 4 && moves % 2 === 0){
      makeMove("O", this);
			interface.setCurrentPlayer("X");
			checkWin(oBoxes, "O Wins!!", oWins, '.owins');
			moves++;
		}
		else if (moves % 2 != 0){
      makeMove("X", this);
			interface.setCurrentPlayer("O");
			moves++;
		}
		else if (moves % 2 === 0){
      makeMove("O", this);
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
		xBoxes = [];
		oBoxes = [];

    interface.resetBoard(firstPlayerName);
	}

	$('div').click(handleMakeMove);
	$('button').click(resetBoard);
});
