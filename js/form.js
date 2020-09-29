class Form {
    constructor(){
        //Getting and storing player name in session storage
        let name = document.getElementById("input_field").value;
        //Creating player object
        this.player = new Player(name);
        this.question_count = 0;
    }
}