var WinCount = 0;
  var LossCount = 0;
 
 
function randomnumber(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}
 // parameter pass
//Math.floor(Math.random()*(max-min+1)+min);(function)

$("#new-game").on("click", function() {
assignumber();
startGame();
$("#message").empty();
 
});
 
var targetNumber;
var counter;
 
function startGame () {
  targetNumber = randomnumber(19, 40);
  $("#number-to-guess").text(targetNumber);
  counter = 0;
  $("#total-score").text(counter);
   
}
 
startGame();
 
 
 
  
  var numberOptions = [];
  var crystalImages = ["assets/images/greencrystal.svg", "assets/images/yellowcrystal.svg", "assets/images/bluecrystal.svg", "assets/images/redcrystal.svg"];
  var crystalObjects = [];
 
  // Next we create a for loop to create crystals for every numberOption.
  for (var i = 0; i < crystalImages.length; i++) {
 
    // For each iteration, we will create an crystal
    var crystal = $("<img>");
 
    // Each crystal will be given a src img a unique crystal image
    crystal.attr("src", crystalImages[i]);
 
   
    crystal.addClass("crystal-image");
 
     
    crystalObjects.push(crystal);
 
 
 
    
    $("#crystals").append(crystal);
 
  }
 
  function assignumber() {
 
    for (i = 0; i < crystalObjects.length; i++){
 
    // here we have access to the object again
    var crystal = crystalObjects[i];
 
    // Each crystal will be given a random number from 1 - 12
    numberOptions[i] = Math.floor(Math.random() * 12) + 1
 
    // and then assign it
    crystal.attr("data-crystalvalue", numberOptions[i]);
    }
  }
 
assignumber();
  // This time, our click event applies to every single crystal on the page. Not just one.
 
  $(".crystal-image").on("click", function() {
 
  
 
    var crystalValue = ($(this).attr("data-crystalvalue"));
    crystalValue = parseInt(crystalValue);
    counter += crystalValue;
 
   
    $("#total-score").text(counter);
 
    if (counter === targetNumber) {
      alert("You win!");
      WinCount += 1
      $("#win-total").text(WinCount);
      $("#message").html("<span>You Win!</span>")
    }
 
    else if (counter >= targetNumber) {
      alert("You lose!!");
      LossCount += 1
      $("#loss-total").text(LossCount);
      $("#message").html("<span>You Lost!</span>")
    }
 
  });