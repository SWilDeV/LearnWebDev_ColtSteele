var faker = require('faker');

var randomName = faker.name.findName();
var randomProduct = faker.commerce.product();
var randomPrice = faker.commerce.price();
 
function PrintProduct(){
    var randomProduct = faker.commerce.product();
    var randomPrice = faker.commerce.price();
    console.log(randomProduct +" - "+ randomPrice + "$");
}

for(let i = 0; i<10; i++){
    PrintProduct()
}
