(function(){



	/*
    function makeMove(state, depth, alpha, beta, maximizingPlayer)

    Input:
    state: A state (see state.js)

    Output: Returns an integer indicating the location
    to drop the piece.

    This function is the only function called
    by others.html and self.html.  Only changes to this
    (and to functions called by it) will influence
    the behavior of your agent.

    Note that minimax_specs.js doesn't test this at all.
    After all, it makes perfectly legal moves just with
    the code below...
	*/
	var DEPTH = 4;
	var makeMove = function(state){

		//To get all legal moves.
		//This will be useful.
		var allLegalMoves = state.legalMoves();
		// To get a successor state following a move,
		// do the following.  This will be useful.
		// var successor = state.move(someLegalMove)

		//To get the side which is moving (either
		//an 'x' or an 'o', do this.
		var playerMoving = state.nextMovePlayer;

		//You'll want to change this...
		//Currently moves randomly.
		// return allLegalMoves[Math.floor(Math.random()*allLegalMoves.length)];
		function closedMinimaxGuy( moveGuy ) {
			return minimax( state.move( moveGuy ), DEPTH, playerMoving );
		}
		var answer = max(allLegalMoves, closedMinimaxGuy);
		// var answer = allLegalMoves.sort( (prev, curr) => {
		// 	//console.log(prev, curr);
		// 	return minimax(state.move(prev), DEPTH, playerMoving) - minimax(state.move(curr), DEPTH, playerMoving);
		// })
		//console.log(answer);
		return answer;
		// return allLegalMoves[0]
	}



	//Bonus function.  Might be useful.
	//Takes an array and a function, and returns
	//the element of the array which gives the highest
	//value when fed into the function.
	var max = function(arr, func){
		var maxReturn = arr.reduce(function(tuple, cur, index){
			//console.log(tuple, cur, index, arr);
			var value = func(cur)
			return (tuple.value >= value) ? tuple : {element: cur, value: value};
		},{element: arr[0], value: func(arr[0])});
		return maxReturn.element;
	}



	/*
	function heuristic(state, maximizingPlayer)

	Input:
	state: A state (see state.js)
	maximizingPlayer: The player who is maximizing ('x' or 'o');

	Output: A number evaluating how good the state is from
	the perspective of the player who is maximizing.

	The number should be higher the better the position is for the
	maximizing player, and lower the better the position is for
	the minimizing player.

	A useful method on state here would be .numLines, which takes an integer and a player
	like "state.numLines(2,'x')" and returns the number of lines of that length that
	player.

	You'll want to pass some of the tests defined in minimax_specs.js.
	If you have mocha installed generally, just type "mocha minimax_specs.js"
	at the command line in the correct folder to see if you
	pass it.
	*/
	var heuristic = function(state, maximizingPlayer){
		//Need some code here.
		var minimizingPlayer = maximizingPlayer === 'x' ? 'o' : 'x';
		try{
			var numLines = {
				min: state.numLines(2, minimizingPlayer)+state.numLines(3, minimizingPlayer)+state.numLines(4,minimizingPlayer)^4,
				max: state.numLines(2, maximizingPlayer)+state.numLines(3, maximizingPlayer)+state.numLines(4,maximizingPlayer)^4
			};

			var stateValue = numLines.max - numLines.min;
			return stateValue;
		}
		catch(err) {console.error(err)};
	}



	/*
    function minimax(state, depth, maximizingPlayer)

    Input:
    state: A state (see state.js)
    depth: An integer, >= 0.  The function should return the value
       of heuristic, defined above, if depth == 0.
    maximizingPlayer: 'x' or 'o'

    Output: Returns a number evaluating the state, just
    like heuristic does.

	You'll need to use state.nextStates(), which returns
	a list of possible successor states to the state passed in
	as an argument.

	You'll also probably need to use state.nextMovePlayer,
	which returns whether the next moving player is 'x' or 'o',
	to see if you are maximizing or minimizing.

	That should be about all the API from State that you need to
	know, I believe.
	*/
	var minimax = function(state, depth, maximizingPlayer){
		var possibleStates = state.nextStates();
		if (!depth || !possibleStates.length) return heuristic(state, maximizingPlayer);
		var currentPlayer = state.nextMovePlayer;
		var reducerFn = maximizingPlayer === currentPlayer ? Math.max : Math.min;
		var mappedStates = possibleStates.map(function(state){
			var miniresult = minimax(state, depth-1, maximizingPlayer);
			//console.log('depth:',depth,'MINIresult:',miniresult)
			return miniresult;
		});
		//console.log('depth:',depth,'MAPPEDstates:',mappedStates)
		var result = reducerFn(...mappedStates);
		//console.log('depth:',depth,'result:',result);
		return result;
	}



	var minimaxAlphaBetaWrapper = function(state, depth, maximizingPlayer){
		/*
	    function minimaxAB(state, depth, alpha, beta, maximizingPlayer)

	    Input:
	    state: A state (see state.js)
	    depth: An integer, >= 0.  The function should return the value
	       of heuristic, defined above, if depth == 0.
	    alpha: What the maximizing player can certainly guarantee,
	       if it plays well.
	    beta: What the minimizing player can certainly guarantee, if
	       it plays well.
	    maximizingPlayer: 'x' or 'o'

	    Output: Returns a number evaluating the state.

	    minimax_specs.js doesn't test this at all either.
		*/
		var minimaxAB = function(state, depth, alpha, beta){
			//Need some code here.
		}
		return minimaxAB(state, depth, -10000,10000)
	}




	//Ignore everything here.
	if(typeof window === 'undefined'){
		module.exports = {
			makeMove: makeMove,
			minimax: minimax,
			heuristic: heuristic
		}
	}else {
		set('makeMove', makeMove)
	}

})()
