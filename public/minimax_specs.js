var State = require('./finished/state.js');
var minimaxLib = require('./minimax.js')
var expect = require('chai').expect;

var minimax = minimaxLib.minimax;
var makeMove = minimaxLib.makeMove;
var heuristic = minimaxLib.heuristic;

//The first thing that you'll need to do is establish some kind of heuristic
//which will be used by your minimax program in cases when it cannot play all the way to the
//end of the game.
//The function heuristic takes as input
//1. An instance of State -- that is, a description of the current state of the board.
//2. The current player who is the maximizing player -- the one who is currently
//   trying to maximize the score, unlike the other who is trying to minimize.

describe("Testing some basic functionality for the heuristics", function(){

	it("Returns a number after being given a state", function(){
		//Make a new game state
		var s = new State();
		expect(typeof (heuristic(s, 'x')) == 'number').to.equal(true);
		expect(typeof (heuristic(s, 'o')) == 'number').to.equal(true);

	});

	it("Returns the negative of the value for one player when maximizing player is switched", function(){
		for(var x = 0; x < 100; x++){
			var s = new State();
			//Make some random moves
			for(var z = 0; z < 7; z++){
				s = s.move( Math.floor(Math.random() * s.width ) )
			}
			expect( -heuristic(s, 'x') == heuristic(s, 'o')).to.equal(true);;
		}
	});

	it("It returns a higher score when 'x' has two in a single line, and 'o' has two disconnected", function(){
		//Make a new game state
		var s = new State();
		s = s.move(0)
		s = s.move(5)
		var lower = heuristic(s, 'x')
		s = s.move(0)
		s = s.move(2)
		var higher = heuristic(s, 'x')
		expect(typeof lower == 'number').to.equal(true);
		expect(typeof higher == 'number').to.equal(true);
		expect(lower < higher).to.equal(true);
	});

	it("It returns a higher score when 'x' has three in a single line, and 'o' has two connected, and one not connected", function(){
		//Make a new game state
		var s = new State();
		s = s.move(0)
		s = s.move(1)
		s = s.move(0)
		s = s.move(1)
		var lower = heuristic(s, 'x')
		s = s.move(0)
		s = s.move(3)
		var higher = heuristic(s, 'x');
		expect(typeof lower == 'number').to.equal(true);
		expect(typeof higher == 'number').to.equal(true);
		expect(lower < higher).to.equal(true);
	});

	it("It returns a higher score when 'x' has four in a single line, and 'o' has three connected, and one not connected", function(){
		//Make a new game state
		var s = new State();
		s = s.move(0)
		s = s.move(1)
		s = s.move(0)
		s = s.move(1)
		s = s.move(0)
		s = s.move(1)
		var lower = heuristic(s, 'x')
		s = s.move(0)
		var higher = heuristic(s, 'x');
		expect(typeof lower == 'number').to.equal(true);
		expect(typeof higher == 'number').to.equal(true);
		expect(lower < higher).to.equal(true);
	});

	it("It returns 100 when 'x' has four in a row", function(){
		//Make a new game state
		var s = new State();
		s = s.move(0)
		s = s.move(1)
		s = s.move(0)
		s = s.move(3)
		s = s.move(0)
		s = s.move(5)
		s = s.move(0)
		var winner = heuristic(s, 'x');
		expect(typeof winner == 'number').to.equal(true);
		expect(winner).to.equal(100);
	});

	it("It returns -100 when 'o' has four in a row", function(){
		//Make a new game state
		var s = new State();
		s = s.move(1)
		s = s.move(0)
		s = s.move(1)
		s = s.move(0)
		s = s.move(3)
		s = s.move(0)
		s = s.move(5)
		s = s.move(0)
		var looooser = heuristic(s, 'x');
		expect(typeof looooser == 'number').to.equal(true);
		expect(looooser).to.equal(-100);
	});

});

describe('Testing some basic functions in the minimax evaluation function', function(){

	it('Returns simply the value of the heuristic function when depth is set to 0', function(){
		for(var x = 0; x < 10; x++){
			//Make a new game state
			var s = new State();
			//Make some random moves
			for(var z = 0; z < 7; z++){
				s = s.move( Math.floor(Math.random() * s.width ) )
			}
			var heuristicValue = heuristic(s, 'x');
			var minimaxValue = minimax(s, 0, 'x');
			expect(typeof heuristicValue == 'number').to.equal(true);
			expect(typeof minimaxValue == 'number').to.equal(true);
			expect(heuristicValue == minimaxValue);
		}
	});

	it('Also returns simply the value of the heuristic function when there are no moves left to make', function(){
		for(var x = 0; x < 5; x++){
			//Make a new game state, with a board height of 1 so
			//that s.nextStates or s.legalMoves returns an array
			//of length zero after we've filled the first
			//and last row entirely.
			var s = new State({height: 1});
			s = s.move(0)
			s = s.move(1)
			s = s.move(2)
			s = s.move(3)
			s = s.move(4)
			s = s.move(5)
			s = s.move(6)
			var heuristicValue = heuristic(s, 'x');
			var minimaxValue = minimax(s, 32, 'x');
			expect(typeof heuristicValue == 'number').to.equal(true);
			expect(typeof minimaxValue == 'number').to.equal(true);
			expect(heuristicValue == minimaxValue).to.equal(true);;
		}
	});

	it("doesn't throw an error for a contrived state", function(){

		var s = new State();
		s = s.move(2);
		//console.log( heuristic(s, 'o') );
		//console.log( minimax( s, 1, 'o'));

	});

	it("It returns values when there's depth involved", function(){
  	//console.log("NOUS SOMMES ICI!!!");
		for(var x = 0; x < 10; x++){
			var s = new State();
			var val = minimax(s, Math.floor(Math.random()*2), 'x');
			expect(typeof val == 'number').to.equal(true);;
		}


	});

});
