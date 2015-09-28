;(function() {
  var interface = {
    resetBoard: function (firstPlayerName) {
      console.log("hey resetting!");
		  $('div').css('pointer-events', 'auto');
		  $('div').removeClass();
		  $('#winner').hide();
		  $('.who').show();

      interface.setCurrentPlayer(firstPlayerName);
    },

    makeMove: function() {

    },

    setCurrentPlayer: function(playerName) {
      $('.turn').html(playerName);
    }
  };

  window.interface = interface;
})();
