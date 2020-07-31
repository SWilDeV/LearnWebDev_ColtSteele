
var age = Number(prompt("What is your age?"))
var rAge = Math.sqrt(age)
//alert(+rAge)

if(age<0)
{
    alert("error, negative number ")
}

else if(age===21)
{
    alert("Congrats, you are 21!")
}

if(age%2 !==0)
{
    alert("your age is odd ")
}
if(age%rAge === 0)
{
    alert("your age is a perfect square ")
}
