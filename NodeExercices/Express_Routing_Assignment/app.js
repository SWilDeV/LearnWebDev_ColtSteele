var express= require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req,res){
    let animal = req.params.animal.toLowerCase();
    let sounds= {
        pig: "Grouin",
        dog:"Woof Woof",
        cat:"fuck off",
        fish:"..."
    };
    res.send("The " +animal+" says "+ sounds[animal]);
});


app.get("/repeat/:sound/:number", function(req,res){
     //convert string to number and store in variable 'number'
     let number = parseInt(req.params.number,10);
     let Array=[];
    for(let i=0; i<number;i++){
        Array.push(req.params.sound);
    }
    res.send(Array.join(" "));
});

app.get("*", function(req,res){
    res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(3000, function(){
    console.log("Serving Express App Assignment on port 3000");
});