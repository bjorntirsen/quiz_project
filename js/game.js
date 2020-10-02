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
        let option_group = document.getElementById("option_group");
        option_group.innerHTML = ""; 
        if (question_index === this.ready){
            question.innerHTML = this.ready.question;
        }        
        else {        
            console.log("0 är "+this.question_list.list[0]);
            console.log("1 är "+this.question_list.list[1]);
            console.log(this.question_list.list[question_index]);
            let displayed_question = this.question_list.list[question_index];
            console.log(displayed_question);
            question.innerHTML = displayed_question.question;
            for (let i = 0; i < displayed_question.answers.length; i++) {
                if (displayed_question.answers[i][1] != null) {
                    let li_option = document.createElement('li');
                    li_option.setAttribute("id", "option" + i);
                    li_option.classList.add("option");
                    li_option.innerHTML = displayed_question.answers[i][1];
                    option_group.append(li_option);                    
                }                
            }
            this.current_question++;
            console.log(this.current_question);
        }
             
    }
    goToNext(question_index){
        this.publishQuestion(question_index);
        this.makeOptionsSelectable();
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
        let answers = document.getElementById("input_field").value;
            sessionStorage.setItem("name", name);
    }
}
