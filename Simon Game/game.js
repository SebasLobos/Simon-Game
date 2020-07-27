var gamePattern = [];
var userPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var startGame = false;
var level = 0;
// Game Sequence 


function nextSequence() {
    userPattern = [];
    level += 1;
    $("h1").text("Level: " + level);
    
    var randomNumber = Math.floor((Math.random() * 4));
    var randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    $("div #" + randomChosenColor).fadeOut(100).fadeIn(100);
    makeNoise(randomChosenColor);
    
};

function makeNoise(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
};

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
        }, 100);
    };     

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] == userPattern[currentLevel]){
        if (gamePattern.length == userPattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }
    }else{
        makeNoise("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
           $("body").removeClass("game-over");     
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");   
        startOver();
    }


}

function startOver(){
    level = 0;
    gamePattern = [];
    startGame = false;
}

// Waiting for start

$(document).keypress(function () {
    if (!startGame) {
      $("#level-title").text("Level: " + level);
      nextSequence();
      startGame = true;
    }
});
// Player Sequence

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
    makeNoise(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userPattern.length-1);
});
     