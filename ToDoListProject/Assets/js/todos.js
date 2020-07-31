// check off specidfic todos by clicking

$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
});

//Remove when X is Pressed
$("ul").on("click", "span",function(event){ 
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation(); 
})

$("input[type='text']").keypress(function(event){
    if(event.which === 13){
        const toDoText =$(this).val();
        $(this).val("");
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + toDoText+ "</li>");
    }
})

$("#plus").on("click", function(){
    $("input").fadeToggle();
    
})