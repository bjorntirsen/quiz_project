class Game {
    constructor(){
        this.player = new Player();
        this.question_amount = sessionStorage.getItem("question_amount");
        this.current_question = 0;
        this.publishPlayer();
        this.question_list = new Question_list();
        
    }
    publishPlayer(){
        document.getElementById("user_welcome").innerHTML += this.player.name;
    }
    async publishQuestion(index){
        let question = document.getElementById("question");  
        question.innerHTML = this.question_list[index].question;      
    }
} 