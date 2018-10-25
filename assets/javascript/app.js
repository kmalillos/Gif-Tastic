// Api Key: GjPLNyBk4cBQkJtIBFXkhJha8PESc52X

$(document).ready(function () {

// --- Global Variables ---

    // movie title array
var topics = ["Bridesmaids", "Clueless", "How to Lose a Guy in 10 Days", "Legally Blonde", "Mean Girls",
            "Miss Congeniality", "Pitch Perfect", "The Devil Wears Prada", "The Notebook", "The Princess Diaries"];


// --- Functions ---

function displayButtons () {

    $(".gif-buttons").empty();
    
    for (var i=0; i<topics.length; i++) {
        var gifButton = $("<button>")
            gifButton.attr("movieTitle", topics[i]);
            gifButton.append(topics[i]);        
        $(".gif-buttons").append(gifButton);
    }

};

function addButton () {

}

function displayGifs () {

}


// --- Main Process ---

displayButtons();

$("button").on("click", function () {

    var title = $(this).attr("movieTitle");
    var apiKey = "GjPLNyBk4cBQkJtIBFXkhJha8PESc52X";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                    title + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
                console.log(response.data);

            var results = response.data;
            

            for (var i=0; i<results.length; i++) {
            
            // $(".gif-display").empty();

                var gifHolder = $("<div>")
                
                var rating = $("<p>");
                    rating.text("Rating: " + results[i].rating);
                gifHolder.append(rating);

                var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("alt", "chick flick gif");
                gifHolder.append(gifImage);
            
            $(".gif-display").prepend(gifHolder);
            
            }; // close for loop

        }) // close ajax.then

}); // close on click event callback
 

}); // close document.ready