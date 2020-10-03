class Game {
    constructor(){
        this.player = new Player();
        this.question_amount = sessionStorage.getItem("question_amount");
        this.current_question_index = -1;
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
        let option_group = document.getElementById("option_group");
        option_group.innerHTML = ""; 
        if (question_index === this.ready){
            question.innerHTML = this.ready.question;
        }        
        else {        
            let displayed_question = this.question_list.list[this.current_question_index];
            console.log("The displayed question is");
            console.log(displayed_question);
            question.innerText = displayed_question.question;
            for (let i = 0; i < displayed_question.answers.length; i++) {
                if (displayed_question.answers[i][1] != null) {
                    let li_option = document.createElement('li');
                    li_option.setAttribute("id", i);
                    li_option.classList.add("option");
                    li_option.innerText = displayed_question.answers[i][1];
                    option_group.append(li_option);                    
                }                
            }
            
            console.log(this.current_question_index);
        }
             
    }
    toggleSecondButton(){
        if (this.current_question_index > 0) {
            let this_class = this;
            let back_button = document.createElement('button');
            back_button.setAttribute("id", back_button);
            back_button.classList.add("btn");
            back_button.innerText = "Previous Question";
            let section = document.getElementById("quiz_body");
            let next_button = document.getElementById("btn_next");
            back_button.addEventListener("click", function(){
                this_class.goBack();
            });
            section.insertBefore(back_button, next_button);
            
        }
        if (this.current_question_index === 0) {
            let back = document.getElementById("back_button");
            back.remove();  
        }                    
    }
    goToNext(from_question_index){
        if (this.current_question_index > -1){
            this.rememberAnswers();
        }
        this.current_question_index++;      
        this.publishQuestion(from_question_index);
        this.makeOptionsSelectable();
    }
    goBack(){
        console.log("I want to go back");
        console.log(this.current_question_index);
        console.log(this.current_question_index-2);
        this.goToNext(this.current_question_index-2);
    }
    makeOptionsSelectable(){
        let options = document.querySelectorAll("li.option");
        for (let i = 0; i < options.length; i++){
            options[i].onclick = function(){
                if(options[i].classList.contains("active")){
                    options[i].classList.remove("active");
                }
                else {
                    options[i].classList.add("active");
                }
            }
        }
    }
    rememberAnswers(){
        let answers = document.querySelectorAll("li.active");
        console.log(answers);
        console.log(typeof answers);
        if (this.current_question_index > -1){
            this.player.answer_list[this.current_question_index] = answers;
        }        
        console.log("Answer array below");
        console.log(this.player.answer_list);
    }
}
