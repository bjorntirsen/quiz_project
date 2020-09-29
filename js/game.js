class Game {
    constructor(){
        this.player = new Player();
        this.question_amount = sessionStorage.getItem("question_amount");
        this.current_question = 0;
        this.publishPlayer();        
    }
    publishPlayer(){
        document.getElementById("user_welcome").innerHTML += this.player.name;
        console.log(this.current_question);
    }
}