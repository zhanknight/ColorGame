// VARIABLES HERE VVVVVVVVVVVV

// var gameMode = 6;
var colors = [];
    // for (i=0; i < gameMode; i++) {
    //     colors.push(randomColorMaker());
    // }
var squares = document.querySelectorAll(".square");
var nopeList = [
    "Nope!",
    "Not it!",
    "Try again!",
    "Wrong one!",
    "That's not it!",
]
var nopeCounter = 0;
var targetColorDisplay = document.querySelector("#TargetColor");
var statusBar = document.querySelector("#status");

// reset button
document.querySelector("#reset").addEventListener("click", function(){
    document.querySelector("#title").style.backgroundColor = "#232323";
    statusBar.textContent = "Which color is it?";
    gameLogic();

})

// game mode button
// document.querySelector("#gamemode").addEventListener("click", function(){
//     if (gameMode === 6) {
//         gameMode = 3;
//         document.querySelector("#gamemode").textContent = "Hard Mode";
//         gameLogic();
//     } else {
//         gameMode = 6;
//         document.querySelector("#gamemode").textContent = "Easy Mode";
//         gameLogic();
//     }
// })


// GAME LOGIC STARTS HERE VVVVVVVVV

// assign random color to each box in a for loop
gameLogic();



// FUNCTIONS DOWN HERE VVVVVVVVVV
function gameLogic() {
    colors = [];
    for (i=0; i < 6; i++) {
        colors.push(randomColorMaker());
    }
    targetColorDisplay.style.backgroundColor = "#23232323"
    for (i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    
        // add click listener to each box in a for loop
        squares[i].addEventListener("click", colorChosen);
    
        // take one random color, make it the winner
        winnerColor = randomWinnerSelector();
    }
    // display winners RGB in a span up top
    targetColorDisplay.textContent = winnerColor;
    }

function colorChosen() {
// compare clicked box to correct/winner color, respond 
    if (this.style.backgroundColor === winnerColor) {
        statusBar.textContent = "You win the points!";
        targetColorDisplay.style.backgroundColor = winnerColor;
        document.querySelector("#title").style.backgroundColor = winnerColor;
        for (i = 0; i < squares.length; i++) {
            squares[i].style.backgroundColor = this.style.backgroundColor;
        }
    }
    
       else {
        nopeCounter++;
        if (nopeCounter > 4) {
            nopeCounter = 0;
        }
        statusBar.textContent = nopeList[nopeCounter];
        this.style.backgroundColor = "#232323";
        this.removeEventListener("click", colorChosen);
       }
        
    
}

function randomColorMaker() {
// create array of random colors

        var num = Math.round(0xffffff * Math.random());
        var r = num >> 16;
        var g = num >> 8 & 255;
        var b = num & 255;
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}


function randomWinnerSelector() {
// grab a random color from the colors array based on game mode
    var p = Math.floor(Math.random() * colors.length);
    return colors[p];
}
