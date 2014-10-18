
	var guesses = [];
	var hot_guesses = [];
	var cold_guesses = [];
	var num_guesses = 0;
	var comp_number;
	// Click start button - load a computer's random number, set guesses to empty, and num ber of guesses (i) to 0
	$("#start_button").on("click", function() {
		console.log("Button clicked");
		comp_number = Math.floor((Math.random() * 100) + 1);
		console.log("Comp guess is " + comp_number);
		guesses = [];
		hot_guesses= [];
		cold_guesses = [];
		num_guesses = 0;
	});
	// On go - add the guess as number, check to make sure it's wihtin the range
	$("#go_button").on("click", function() {
		console.log("Go button clicked");
		var number = $('input').val();
		console.log("Your guess is " + number);
		for (var k = 0; k < guesses.length ; k ++) {
		// Check if number has already been guessed
				
			if (number === guesses[k]) {
				alert("You already guessed that!");
				console.log(guesses);
				$('input').val("");
				return;
			// guess;
			}
		}
		if (number < 1 || number > 100) {
			alert("Please enter a number between 1 and 100");
			$('input').val("");
		}
		else {
			// if number is allowed, increment guesses by 1
			num_guesses += 1;
			guesses.push(number);
		}

		if (number == comp_number) {
			winner();
		}

		hot_cold(comp_number, number);

		if (number < comp_number) {
			$("#game_area").append("<p>You need to guess higher</p>");
			$("#game_area").append("<p>Guess again!</p>");
			$('input').val("");
		}

		else if (number > comp_number) {
			$("#game_area").append("<p>You need to guess lower</p>");
			$("#game_area").append("<p>Guess again!</p>");
			$('input').val("");
		}

		if (num_guesses > 10) {
			$("#stage").empty();
			$("#stage").append("<p>You reached the max number of guesses!</p>");
			$("#stage").append("<p>Click \"Try Again!\" to play again!</p>");
			return;
		}
	});

	$("#reload_button").on("click", function() {
		location.reload();
	});

	$("#hint").on("click", function() {
		$("#game_area").empty();
		$("#hint").append("<p>");
		$("#hint").append("The number is between " + (comp_number - 2) + " and " + (comp_number + 2) + ".");
		$("#hint").append("</p>");
	})

	var hot_cold = function(number1, number2) {
		if (Math.abs(number1 - number2) <= 10) {
			console.log("Less than 10 off! Getting hotter!");
			hot_guesses.push(number2);
			$("#game_area").empty();
			$("#game_area").append("<p>You are less than 10 off!</p>");
			$("#game_area").append("<p>Hot guesses: " + hot_guesses + "</p>");
			$("#game_area").append("<p>Cold guesses: " + cold_guesses + "</p>");
			$("#game_area").removeClass('cold');
			$("#game_area").addClass('hot');

		}
		else {
			console.log("Youre more than 10 numbers off! Cold as Iceland!");
			cold_guesses.push(number2);
			$("#game_area").empty();
			$("#game_area").append("<p>You are more than 10 off!</p>");
			$("#game_area").append("<p>Hot guesses: " + hot_guesses + "</p>");
			$("#game_area").append("<p>Cold guesses: " + cold_guesses + "</p>");
			$("#game_area").removeClass('hot');
			$("#game_area").addClass('cold');

		}
	}

	var winner = function() {
		$("#stage").empty();
		$("#stage").append("<img src = \"./img/fireworks.jpg\" />");
		alert("Congratulations! You won!");

	}	
