const express = require('express');
var app = express();
const axios = require('axios');
app.set("view engine", "ejs");



app.get("/", function(req,res){
    res.render("home");
});

app.get("/results", function(req, res){
    const query = req.query.search;
    const URL='http://www.omdbapi.com/?s='+ query +'&apikey=thewdb';

    axios.get(URL)
    .then(function(response){
        res.render("results",{response:response.data});
    })
    .catch(function(error){
        console.log(error);
    })
    .finally(function(){

    });

});
// app.get("/results", function(req, res){
//     axios.get('http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb', function(error, response, body){
//         //if(!error && response.statusCode == 200){
//             res.send(body);
//         //}
//     });
// });

app.listen(3000, function(){
    console.log("Movie App has started");
});