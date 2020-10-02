class Game {
    constructor(){
        this.player = new Player();
        this.question_amount = sessionStorage.getItem("question_amount");
        this.current_question = 0;
        this.publishPlayer();
        this.question_list = new Question_list();
        this.ready = new Question();
        this.ready.question = "Are you ready to start the Quiz?";
        this.publishQuestion(this.ready);                        
    }
    publishPlayer(){
        document.getElementById("user_welcome").innerHTML += this.player.name + "!";
    }
    publishQuestion(question_index){
        let question = document.getElementById("question");  
        question.innerHTML = this.ready.question; 
        let option_group = document.getElementById("option_group");
        option_group.innerHTML = "";
        let displayed_question = this.question_list.list[question_index];     
        if (question_index != this.ready) {        
            question.innerHTML = displayed_question.question;
            for (let i = 0; i < displayed_question.answers.length; i++) {
                console.log(displayed_question.answers[i]);
                if (displayed_question.answers[i].value != null) {
                    let li_option = document.createElement('li');
                    li_option.setAttribute("id", "option" + i);
                    li_option.innerHTML = question_index.answers[i];
                    option_group.append(li_option);
                    this.current_question++;
                }
                
            }
            
        }
             
    }
    goToNext(){
        this.publishQuestion(this.current_question);
    }
} 