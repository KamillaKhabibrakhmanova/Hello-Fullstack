var wins = 0;
var losses = 0;
var random;
var car;
var player;

// Get new random picks for player, car door
var draw = function() {
	car = Math.floor((Math.random() * 3) + 1);
	player = Math.floor((Math.random() * 3) + 1);
}

var clear = function() {
	wins = 0;
	losses = 0;
}


// case: players switches
for (var j = 0; j < 1000; j++) {
	if (player !== car) {
		wins += 1;
		draw();
	}
	else {
		losses += 1;
		draw();
	}
	
}
console.log("If the player switched, the result would be: " + wins/10 + "% wins and " + losses/10 + "% losses.");
clear();

// case: players stays with original choice	
for (var j = 0; j < 1000; j++) {
	if (player === car) {
		wins += 1;
		draw();
	}
	else {
		losses += 1;
		draw();
	}
	
}

console.log("If the player stayed, the result would be: " + wins/10 + "% wins and " + losses/10 + "% losses.");
clear();
