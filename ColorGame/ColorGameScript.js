var numSquares = 6;
var colors = [];
var pickedColor;

var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelectorAll("h1");
var resetButton = document.querySelector("#newGame");
var modeButtons = document.querySelectorAll(".mode");

Init();

function Init(){
    SetupModeButtons();
    SetupSquares();
    SetupResetButton();
    reset();
}

function SetupSquares(){
    for(var i = 0; i<squares.length; i++){
        // add initial colors to squares
        squares[i].style.backgroundColor = colors[i];
    
        //add click listeners to squares
        squares[i].addEventListener("click", function(){
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor;
            //compare color to pickcolor
            if (clickedColor === pickedColor)
            {
                messageDisplay.textContent = "Correct !";
                ChangeColor(clickedColor);
                resetButton.textContent ="Play Again"
            }
            else
            {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!";
                messageDisplay.classList.add()
            }
        });
    }
}

function SetupModeButtons(){
    for(var i = 0; i<modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            if(this.textContent == "Easy"){
                numSquares=3;
            } 
            else{
                numSquares=6;
            } 
            reset();
        });
    }
}

function reset(){
    colors = GenerateRandomColors(numSquares);
    pickedColor = PickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i<squares.length; i++){
        if(colors[i]){
            squares[i].style.display ="block";
            squares[i].style.backgroundColor = colors[i];
        }
        else{
            squares[i].style.display = "none";
        }
    }
    resetButton.textContent ="New Color";
    messageDisplay.textContent = "";
    for(var i=0; i<h1.length; i++){
        h1[i].style.backgroundColor = "steelblue";
    }
}

function SetupResetButton(){
    resetButton.addEventListener("click", function(){
        reset();
    })
}


function ChangeColor(color){
    for(var i=0; i<squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
    for(var i=0; i<h1.length; i++){
        h1[i].style.backgroundColor = color;
    }
}

function PickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function GenerateRandomColors(colorsNum){
var arr = [];
for(var i = 0; i<colorsNum;i++){
    arr.push(RandomColor());
}
return arr;
}

function RandomColor(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r +", "+ g+", "+ b+")";
}
