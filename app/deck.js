(function(){
	var app = angular.module('getDeck', ['app-service', 'ngSanitize']);

	app.controller('DeckController',['$location', '$scope','$sce','deckGetter', function($location, $scope, $sce, deckGetter){

		var deckStuff = $location.search();

		var deckId = parseInt(deckStuff.deck);

		var deckInfo = deckGetter.getNextDeck2(deckId);
		if (isNaN(deckId) || deckInfo === undefined){
			deckId = 214;
			deckInfo = deckGetter.getNextDeck2(deckId);
		};	
		deckInfo.then(function(deck){
			$scope.deck = deck;
			if($scope.deck.content === null || $scope.deck.content.sourceUrl === undefined || $scope.deck.content.sourceUrl.indexOf('youtube') == -1 ){
				window.location.href = "http://ntoscano.github.io/membrightVideoPlayer/app/index.html#?deck=214"
			};
			deckInfo.cards.then(function(cards){
				$scope.deck.cards = cards.objects;
				for (var x in $scope.deck.cards){
    	    		time = $scope.deck.cards[x].obj.links[0].label.split(":");
        		    time = [parseInt(time[0]), parseInt(time[1])];
    	    	    $scope.deck.cards[x].time = time[0] * 60 + time[1];
	            	$scope.deck.cards[x].minTime = $scope.deck.cards[x].obj.links[0].label;
	        	};
				if(!$scope.$$phase) $scope.$apply();
			})
			$scope.des = $scope.deck.content.description;
			if(!$scope.$$phase) $scope.$apply();
		});


		$scope.$on('seek', function(event, time){
			$scope.$broadcast('seekTo', time);
		});
		$scope.$on('timer', function(event, Vtime){
			$scope.$broadcast('highlight', Vtime);
		});
		$scope.$on('timer2', function(event, Vtime){
			$scope.$broadcast('highlight2', Vtime);
		});

   	}]);
})();
