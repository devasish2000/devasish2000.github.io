var topics = ["dog", "cat", "rabbit", "turtle", "fish", "squirrel", "deer", "skunk", "bear", "snake", "salamander"];
var creatureButton;
var animalImage;
var rating;


function creatureButton() {
  $("#buttons").empty();

  $("#animal").val("");

  for (var i=0; i < topics.length; i++) {
    var creatureButton = $("<button>");
    creatureButton.addClass("animal-btn");
    creatureButton.attr("data-animal", topics[i]);
    creatureButton.text(topics[i]);
    $("#buttons").append(creatureButton);
    console.log(topics[i]);
  }
}


function displayImages() {
  $("#gifs").empty();
  $(".item").empty();


    var animal = $(this).attr("data-animal");
    console.log("this: " + this);
    console.log("animal: " + animal);
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=WtL7a88I6lDSvslFMP2JlDT1WvGXcUET&limit=25";

    //
    $.ajax({
      url: queryURL,
      method: "GET"
    })

    //
    .done(function(response) {

      console.log(response);
      //
      var results = response.data;

      var x = 10;      
     
      for (var i = 0; i < x; i++) {
        console.log("results.length: " + results.length);
        
        var gifDiv = $("<div class='item float-left'>");
        
        var rating = results[i].rating;

        
        if (rating !== "r" && rating !== "pg-13") {
         
          var p = $("<p>").text("Rating: " + rating);
          
          var animalImage = $("<img>");
          
          animalImage.attr("src", results[i].images.fixed_height_still.url);
         
          animalImage.attr("data-state", "still");
         
          animalImage.attr("data-still", results[i].images.fixed_height_still.url);
          
          animalImage.attr("data-animate", results[i].images.fixed_height.url);     
          animalImage.addClass("gif");
          
          gifDiv.prepend(animalImage);
          gifDiv.prepend(p);
          
          $("#gifs").prepend(gifDiv);  
          
        }
        
        else {
          x++;
        }

          
      }
      
      $(".gif").on("click", function() {

        var state = $(this).attr("data-state");

        if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        }

        else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }
      });
    });
  
  }



$("#add-animal").on("click", function(event) {
 
  event.preventDefault();

  
  var newTopic = $("#animal").val().trim();

  
  topics.push(newTopic);

  
  creatureButton();

});


creatureButton();

$(document).on("click", ".animal-btn", displayImages);