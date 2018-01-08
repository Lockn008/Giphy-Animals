var animalArray = ["panda", "raccoon", "weasel", "marten", "orangutan", "elephant", "buffalo"];

var renderButtons = function() {
	$('#animal-list').empty();
	for (var i = 0; i < animalArray.length; i++) {
		$('#animal-list').append('<button id="list-button" type="button" value="' + animalArray[i] + '">' + animalArray[i] + '</button>');
	}

	$('button').on("click", function() {
		$('#animal-display').empty();
		var animal = $(this).val();
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=5cw7Npg8v4WebXZ6xwNcquGDe6S72dND&limit=10";

		$.ajax({
			url: queryURL,
			method: "GET"
		})
		.done(function(response) {
			console.log(response);

			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var gifDiv = $('<div class="item">');
				var rating = results[i].rating;
				var caption = $('<p>').text("Rating: " + rating);

				var image = $('<img>');
				image.addClass('gif');
				image.attr('src', results[i].images.fixed_height_still.url);
				image.attr('data-still', results[i].images.fixed_height_still.url);
				image.attr('data-animate', results[i].images.fixed_height.url);
				image.attr('data-state', 'still');

				gifDiv.prepend(caption);
				gifDiv.prepend(image);
				$('#animal-display').prepend(gifDiv);
			};

			if (results.length<10) {
				$('#animal-display').prepend("Less than 10 results found for " + animal);
			};

			$('.gif').on("click", function() {
				var state = $(this).attr('data-state');
				console.log(state);
				console.log($(this));
				
				if (state == "still") {
					$(this).attr('src', $(this).attr('data-animate'));
					$(this).attr('data-state', 'animate');
				} else if (state == "animate") {
					$(this).attr('src', $(this).attr('data-still'));
					$(this).attr('data-state', 'still');
				}
			});
		});
	});
}

renderButtons();

$("#animal-submit").on("click", function(event) {
	event.preventDefault();
	var animalAdd = $("#add-animal").val().trim();
	animalArray.push(animalAdd);
	renderButtons();
});




