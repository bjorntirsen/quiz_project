document.addEventListener("DOMContentLoaded", function(e){
    let submit_button = document.getElementById("submit");
    submit_button.addEventListener("click", function(event){
        /* Preventing error below */
        event.preventDefault(event);        
        location.href ="quiz.html";    
    })
})

