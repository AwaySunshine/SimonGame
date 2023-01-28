var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//trigger next seq
function nextSequence () {
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

//keypress start
$(document).keypress(function() {
if (!started) {
  $("#level-title").text("Level"+level);
  nextSequence();
  started = true;
  }
});

//button click
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

//check answer
function checkAnswer (currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Succed");
    if (userClickedPattern.length===gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("Wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

//play sounds
function playSound (name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
};

//button animation
function animatePress (currentColour) {
  $("#"+currentColour).addClass("pressed");
  setTimeout (function() {
    $("#"+currentColour).removeClass("pressed");
  }, 100)
}

//restart game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
