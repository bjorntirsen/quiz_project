document.addEventListener("DOMContentLoaded", function(e){
    let submit_button = document.getElementById("submit");
    submit_button.addEventListener("click", function(event){
        /* Preventing error below */
        event.preventDefault(event);
        let the_player = new Player();
    })
})

