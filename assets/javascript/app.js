$(document).ready(function () {

    let topics = ["andy samberg", "zach galifinakis", "aziz ansari", "tina fey"];
    const apiKey = "IchOpLi55SE8l0GqFPjvENCexKEix8t7";
    const limit = 10;
    const rating = "g";

    //Creates buttons from the topics array
    function createButtons() {

        $(".button-holder").empty();

        for (let i = 0; i < topics.length; i++) {

            let newButton = $("<button>");
            newButton.addClass("search-button btn btn-success");
            newButton.attr("value", topics[i]);
            newButton.html(topics[i]);
            newButton.appendTo(".button-holder");

        }

    }

    //Initializing buttons in original array when page loads
    createButtons();

    //Makes a request to GiphyAPI based on what button we click
    $(document).on("click", ".search-button", function () {

        let click = $(this).val();

        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${click}&limit=${limit}&rating=${rating}&api_key=${apiKey}`

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {

            $(".gif-holder").empty();

            //Displays the first 10 search results
            for (let i = 0; i < limit; i++) {

                //Creating new elements to house our search results and display to the page
                let newDiv = $("<div>");
                let newRating = $("<p>").html(`Rating: ${response.data[i].rating.toUpperCase()}`);;
                let newImage = $("<img>").attr({
                    src: response.data[i].images.fixed_height_still.url,
                    "data-still": response.data[i].images.fixed_height_still.url,
                    "data-animate": response.data[i].images.fixed_height.url,
                    "data-state": "still"
                }).addClass("gif");
                newDiv.append(newRating);
                newDiv.append(newImage);
                newDiv.appendTo(".gif-holder");

            }
        });


    });

    //Adds in the input of the textbox to the array and creates a button of it
    $(".create-button").on("click", function () {
        event.preventDefault();

        topics.push($(".create-input").val());
        createButtons();

        $(".create-input").val("");
    });

    //Toggle a still image and animated GIF on click
    $(document).on("click", ".gif", function () {

        let state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"))
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }


    });

})