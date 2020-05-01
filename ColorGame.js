// VARIABLES HERE VVVVVVVVVVVV
let colors = [];
let squares = document.querySelectorAll(".square");
const nopeList = [
    "Nope!",
    "Not it!",
    "Try again!",
    "Wrong one!",
    "That's not it!",
]
let nopeCounter = 0;
let targetColorDisplay = document.querySelector("#TargetColor");
let statusBar = document.querySelector("#status");

// reset button
document.querySelector("#reset").addEventListener("click", function(){
    document.querySelector("#title").style.backgroundColor = "#232323";
    statusBar.textContent = "Which color is it?";
    gameLogic();

})

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
        let num = Math.round(0xffffff * Math.random());
        let r = num >> 16;
        let g = num >> 8 & 255;
        let b = num & 255;
        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}

function randomWinnerSelector() {
// grab a random color from the colors array based on game mode
    let p = Math.floor(Math.random() * colors.length);
    return colors[p];
}

// start game
gameLogic();

// slide down the whole thing on page load to look cool
let container = document.querySelector('#container')

function isReady(callbackFunc) {
    if (document.readyState !== 'loading') {
      // Document is already ready, call the callback directly
      callbackFunc();
    } else if (document.addEventListener) {
      // All modern browsers to register DOMContentLoaded
      document.addEventListener('DOMContentLoaded', callbackFunc);
     } 
  }
  
isReady(function() {
if(!container.classList.contains('active')) {
    container.classList.add('active')
    container.style.height = "auto"
    let height = container.clientHeight + "px"
    container.style.height = "0px"
    setTimeout(() => {
        container.style.height = height
    }, 0) 
} 
});

