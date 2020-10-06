document.addEventListener("DOMContentLoaded", function(e){
    let my_form = new Form();
    let submit_button = document.getElementById("submit_button");
    submit_button.addEventListener("click", function(event){
        /* Preventing error from submit button below */
        event.preventDefault(event);
        my_form.submitForm();
    })
})