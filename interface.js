;(function() {
  var interface = {
    resetBoard: function (firstPlayerName) {
		  $('div').css('pointer-events', 'auto');
		  $('div').removeClass();
		  $('#winner').hide();
		  $('.who').show();

      interface.setCurrentPlayer(firstPlayerName);
    },

    setMove: function(player, id) {
      $('#' + id).addClass(player); // todo: change for state changing code
    },

    setCurrentPlayer: function(playerName) {
      $('.turn').html(playerName);
    },

    setWin: function(player, tally){
      $('#winner').html(player + ' Wins!!');
      $('#winner').show();
      $('.xwins').html(tally.forX);
      $('.owins').html(tally.forO);
      $('.who').hide();
      $('div').css('pointer-events', 'none');
    }
  };

  window.interface = interface;
})();
