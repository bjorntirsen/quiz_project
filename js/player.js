class Player {
    constructor(){
        
        let name = document.getElementById("input_field").value;
        //Storing player name in session storage
        sessionStorage.setItem("name", name);
        location.href ="quiz.html";
    }
}