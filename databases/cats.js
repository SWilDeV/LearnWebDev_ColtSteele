const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/cat_app",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(() => console.log('Connected to DB'))
.catch(error => console.log(error.message));

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

//adding a new cat to the DB

// var george =new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament:"Evil"
// });

// george.save(function(err, cat){
//     if(err){
//         console.log("Something went wrong");
//     }else{
//         console.log("We just saved a cat to the DB");
//         console.log(cat);
//     }
// });

Cat.create({
    name:"SnowWhite",
    age: 15,
    temperament: "Bland"
}, function(err,cat){
    if(err){
        console.log("Bug");
        console.log(err);
    }else{
        console.log(cat);
    }
});


//Retrieve all cats from the DB and console.log each of them
Cat.find({}, function(Err, cats){
    if(Err){
        console.log("OH NO ERROR");
        console.log(Err);
    }else{
        console.log("All the Cats:");
        console.log(cats);
    }
})