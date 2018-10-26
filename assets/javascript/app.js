// Api Key: GjPLNyBk4cBQkJtIBFXkhJha8PESc52X

$(document).ready(function () {

// --- Global Variables ---

    // movie title array
var topics = ["Bridesmaids", "Clueless", "How to Lose a Guy in 10 Days", "Legally Blonde", "Mean Girls",
            "Miss Congeniality", "Pitch Perfect", "The Devil Wears Prada", "The Notebook", "The Princess Diaries"];


// --- Functions ---

    // to display buttons
function displayButtons () {

    $(".gif-buttons").empty();
    
    for (var i=0; i<topics.length; i++) {
        var gifButton = $("<button>")
            gifButton.addClass("title-button");
            gifButton.attr("movieTitle", topics[i]);
            gifButton.append(topics[i]);        
        $(".gif-buttons").append(gifButton);
    }

    // for (var i=0; i<topics.length; i++) {
    //     console.log("Display Buttons: " + topics[i]);
    // }

};

    // to add button
function addButton () {
    $("#add-title").on("click", function(event) {
        event.preventDefault(); 
    
        var newTitle = $("#title-input").val();
        topics.push(newTitle);

        displayButtons();

    });

    
}


// --- Main Process ---

displayButtons();

addButton();

    // title-button on-click ballback function
$(".title-button").on("click", function () {

    console.log("This is a title button");

    var title = $(this).attr("movieTitle");
    var apiKey = "GjPLNyBk4cBQkJtIBFXkhJha8PESc52X";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + title + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            
            $(".gif-text").html("<p>To play and pause, click on the gif images...</p>"); 

            var results = response.data;

            for (var i=0; i<results.length; i++) {

                var gifHolder = $("<div>")
                    gifHolder.addClass("gif-holder")
                
                var rating = $("<p>");
                    rating.text("Rating: " + results[i].rating);
                gifHolder.append(rating);

                var gifImage = $("<img>");
                    gifImage.addClass("gif-image");
                    gifImage.attr("src", results[i].images.fixed_height_still.url);
                    gifImage.attr("still", results[i].images.fixed_height_still.url);
                    gifImage.attr("animate", results[i].images.fixed_height.url);
                    gifImage.attr("state", "still")
                gifHolder.append(gifImage);
            
                $(".gif-display").prepend(gifHolder);
            }; // close for loop

                // gif-image on-click callback function
                // to animate still gif
            $(".gif-image").on("click", function () {

                console.log("this is a gif");

                var state = $(this).attr("state");

                if (state === "still") {
                    $(this).attr("src", $(this).attr("animate"));
                    $(this).attr("state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("still"));
                    $(this).attr("state", "still");
                } // close for loop
            }); // close gif-image on-click function 

        }) // close ajax.then
}); // close title-button on-click function
 


}); // close document.ready