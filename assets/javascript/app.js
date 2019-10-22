$(document).ready(function () {

    let topics = ["andy samberg", "zach galifinakis", "aziz ansari", "tina fey"];
    const apiKey = "IchOpLi55SE8l0GqFPjvENCexKEix8t7";
    const limit = 10;
    const rating = "g";


    function createButtons() {
        $(".button-holder").empty();

        for (let i = 0; i < topics.length; i++) {
            let newButton = $("<button>");
            newButton.addClass("search-button");
            newButton.attr("value", topics[i]);
            newButton.html(topics[i]);
            newButton.appendTo(".button-holder");
        }

    }

    createButtons();

    $(document).on("click", ".search-button", function () {
        let click = $(this).val();

        let queryURL = `https://api.giphy.com/v1/gifs/search?q=${click}&limit=${limit}&rating=${rating}&api_key=${apiKey}`

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            $(".gif-holder").empty();

            for (let i = 0; i < limit; i++) {
                let newDiv = $("<div>");
                let newRating = $("<p>").html(response.data[i].rating);;
                let newImage = $("<img>").attr("src", response.data[i].images.fixed_height_still.url);
                newDiv.append(newRating);
                newDiv.append(newImage);
                newDiv.appendTo(".gif-holder");
            }
        });


    });

    $(".create-button").on("click", function () {
        event.preventDefault();

        topics.push($(".create-input").val());
        createButtons();
    });





































})