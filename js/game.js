class Game {
    constructor(){
        this.player = new Player();
        this.question_amount = sessionStorage.getItem("question_amount");
        this.current_question = 0;
        this.publishPlayer();
        this.question_list = new Question_list();
        this.question_list.fetchQuestions();
        /* console.log(this.question_list);    */ 
    }
    publishPlayer(){
        document.getElementById("user_welcome").innerHTML += this.player.name;
    }
    /* publishQuestion(index){
        let question = document.getElementById("question");
        console.log(this.question_list.list);
        console.log(this.question_list.list.length);
        console.log(list);
        console.log(JSON.stringify(this.question_list.list[0]));
    }*/
} 