var topics = ["wtf", "angry", "surprised", "lit", "derp", "throwing shade", "heck yes"];

// displayGifInfo function re-renders the HTML to display the appropriate content
function displayGifInfo() {

    var reaction = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + reaction + "&api_key=6WY8yl91mTwLrAOZ58Tc0QuQ5xEwqQFi&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".reaction").empty();
        // Creating a div to hold the gifs
        var giphyDiv = $("<div class='reaction'>");

        for (var i = 0; i < response.data.length; i++) {
            var giphyURL = response.data[i].images.fixed_height_still.url;
            var newGifDiv = document.createElement("DIV");
            var newImg = document.createElement("IMG");
            var gifRating = "Rating: " + response.data[i].rating;
            newImg.setAttribute("src", giphyURL);
            var ratingDiv = document.createElement("P");
            ratingDiv.textContent = gifRating;
            newGifDiv.classList.add("div-float")
            newImg.classList.add("click-to-gif");
            newGifDiv.append(newImg);
            giphyDiv.append(newGifDiv);
            newImg.after(ratingDiv);
        };

        $("#reactions-view").append(giphyDiv);
    });

}


// Function for displaying reaction buttons
function renderButtons() {

    // Deleting the reactions prior to adding new reactions
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of topics
    for (var i = 0; i < topics.length; i++) {

        // Then dynamicaly generating buttons for each item in the array
        var giphySearchButton = $("<button>");
        // Adding a class of giphy-btn and bootstrap styles to the button
        giphySearchButton.addClass("giphy-btn btn btn-info");
        // Adding a data-attribute
        giphySearchButton.attr("data-name", topics[i]);
        // Providing the initial button text
        giphySearchButton.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(giphySearchButton);
    }
}

// This function handles events when a reaction button is clicked
$("#add-reaction").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var reaction = $("#reaction-input").val().trim();

    if (reaction === "") {
        alert("Please enter a reaction to create a button.");
    } else if (topics.indexOf(reaction) > -1) {
        alert("You've already made a button for that one! Please enter a new reaction.");
    } else {
        // Adding reaction from the input textbox to the topics array
        topics.push(reaction);

        // Calling renderButtons which handles the processing of our topics array
        renderButtons();
    };

});

// Adding a click event listener to all elements with a class of "giphy-btn"
$(document).on("click", ".giphy-btn", displayGifInfo);

// Start and stop the gif playing
$(document).on('click', '.click-to-gif', function () {
    var src = $(this).attr("src");
    if ($(this).hasClass('playing')) {
        //stop
        $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
        $(this).removeClass('playing');
    } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
    }
});

// Calling the renderButtons function to display the intial buttons
renderButtons();