var buttonColor = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];
var gamePattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $('#level-title').text("level " + level);
        nextSequence();
        started = true;
    }
});

$('.btn').click(function (){
    
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    
    palySound(userChosenColour);
    animatePress(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } 
    else {
        palySound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text('Game over, Press any key to Restart!');

        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);

        startOver();
    }
}

function nextSequence(){
    userClickedPattern = [];
    level++
    $('#level-title').text('level ' + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColor[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#'+randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
    palySound(randomChosenColour);
}

function animatePress(currentColor){
    $('#' + currentColor).addClass('pressed');
    setTimeout(function () {
        $('#' + currentColor).removeClass('pressed');
    },100);
}

function palySound(soundName){
    var soundOnClick = new Audio(`sounds/${soundName}.mp3`);
    soundOnClick.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

