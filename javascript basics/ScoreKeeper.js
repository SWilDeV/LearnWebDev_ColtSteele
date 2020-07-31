var playerOne = document.querySelector("#playerOne");
var playerTwo = document.querySelector("#playerTwo");
var resetButton = document.querySelector("#reset");

var gameOver = false;

var p1Score = document.querySelector("#p1Score");
var p2Score = document.querySelector("#p2Score"); 
var score1 = 0;
var score2 = 0;

var numInput = document.querySelector("input");
var maxScore = document.querySelector("#maxScore");

var winningScore = 5;


playerOne.addEventListener("click", function(){
    if(!gameOver){
         score1++ 
         p1Score.textContent = score1;
         if(score1 === winningScore){
             p1Score.classList.add("winner");
             gameOver = true;
         }
    }
});

playerTwo.addEventListener("click", function(){
    if(!gameOver){
        score2++ 
        p2Score.textContent = score2;
        if(score2 === winningScore){
            gameOver = true;
            p2Score.classList.add("winner");
        }
   }
});

resetButton.addEventListener("click", function(){
   reset();
    });

numInput.addEventListener("change", function(){
    maxScore.textContent = this.value;
    winningScore = Number(this.value);
    reset();
})

function reset(){
    score1 = 0;
    p1Score.textContent = score1;
    p1Score.classList.remove("winner");

    score2 = 0;
    p2Score.textContent = score2;
    p2Score.classList.remove("winner");

    gameOver = false;
}

var spans = document.querySelectorAll("span");

for(var i =0; i <spans.length; i++){
    spans[i].addEventListener("mouseover", function(){
        this.classList.add("winner");
    }) 
};

for(var i =0; i <spans.length; i++){
    spans[i].addEventListener("mouseout", function(){
        this.classList.remove("winner");
    }) 
};