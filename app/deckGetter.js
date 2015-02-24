(function(){
	
	var app = angular.module('app-service', []);

    app.service('deckGetter', ['$http', function($http) {
        var deckGetter = this;
		deckGetter.deck = {};
       
		deckGetter.getNextDeck2 = function(deckId){
			var deck = {};
			var cards = {};
			cardInfo =  function(deckId){ 
				 output = $.ajax({
					url: 'http://membright.com/api/v2/card?deck__id='+deckId+'&format=jsonp&callback=?',
					type: 'GET',
					data: {},
					dataType: 'jsonp',
					success: function(data){
						cards = data;
						return cards;
					},
				});
				return output;
			};
			cards = cardInfo(deckId);
			deckInfo = function(deckId){
				output = $.ajax({
					url: 'https://membright.com/api/v2/deck/'+deckId+'?format=jsonp&callback=foo',
					type: 'GET',
					data: {},
					dataType: 'jsonp',
					success: function(data){
						deck = data;
						return deck;
					},
				});
				return output;
			};
			deck = deckInfo(deckId);
			deck.cards = cards;
			return deck;
		};	
   }]);
})();














