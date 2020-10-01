class Game {
    constructor(){
        this.player = new Player();
        this.question_amount = sessionStorage.getItem("question_amount");
        this.current_question = 0;
        this.publishPlayer();
        this.question_list = new Question_list();
        this.question_list.fetchQuestions();
        console.log(this.question_list);    
    }
    publishPlayer(){
        document.getElementById("user_welcome").innerHTML += this.player.name;
    }
}