class Game {
    constructor(){
        this.player = new Player();
        this.displayReadyPage();
        this.question_amount = sessionStorage.getItem("question_amount");
        this.current_question_index = -1;        
        this.question_list = new Question_list();
        this.no_of_buttons = 1;                      
    }
    
    displayReadyPage() {
        document.getElementById("user_welcome").innerHTML += this.player.name + "!";
        let question_field = document.getElementById("question_field");
        let option_group = document.getElementById("option_group");
        option_group.innerHTML = "";
        question_field.innerHTML = "Are you ready to start the Quiz?";
    }

    initializeNextButton() {
        let that = this;
        let btn_next = document.getElementById("btn_next");
        btn_next.innerHTML = "Start";        
        btn_next.addEventListener("click", function () {
            that.nextQuestion();
        });
    }

    nextQuestion() {
        //Increasing the current_question_index
        this.current_question_index++;
        console.log("I'm about to display question index below");
        console.log(this.current_question_index);
        //This is to start over at the end
        if (this.current_question_index == (Number(this.question_amount)+1)) {
            location.href = "index.html";
        }
        else
        this.toggleFirstButton();
        /* this.toggleSecondButton(); */
        let question_field = document.getElementById("question_field");
        let option_group = document.getElementById("option_group");
        this.rememberAnswers();
        option_group.innerHTML = "";
        
        if (this.current_question_index == this.question_amount) {
            this.correct();
            this.scorePage();
        }        
        else if (this.current_question_index < this.question_amount) {
                       
            let displayed_question = this.question_list.list[this.current_question_index];
            console.log("The displayed question is");
            console.log(displayed_question);
            let corr_answers = this.question_list.list[this.current_question_index].correct_answers;
            console.log("corr_answers below");
            console.log(corr_answers);   
            question_field.innerText = "Q"+(this.current_question_index+1)+": "+displayed_question.question;
            for (let i = 0; i < displayed_question.answers.length; i++) {
                if (displayed_question.answers[i][1] != null) {
                    let li_option = document.createElement('li');
                    li_option.setAttribute("id", i);
                    li_option.classList.add("option");
                    li_option.innerText = displayed_question.answers[i][1];
                    option_group.append(li_option);                    
                }                
            }
            this.makeOptionsSelectable();
            /* this.fillAnswersFromMemory(); */
        }
    }

    /* previousQuestion() {
        let question_field = document.getElementById("question_field");
        let option_group = document.getElementById("option_group");
        this.rememberAnswers();   
        option_group.innerHTML = "";
        let displayed_question = this.question_list.list[this.current_question_index];
        console.log("The displayed question is");
        console.log(displayed_question);
        question.innerText = "Q"+(this.current_question_index+1)+": "+displayed_question.question;
        for (let i = 0; i < displayed_question.answers.length; i++) {
            if (displayed_question.answers[i][1] != null) {
                let li_option = document.createElement('li');
                li_option.setAttribute("id", i);
                li_option.classList.add("option");
                li_option.innerText = displayed_question.answers[i][1];
                option_group.append(li_option);                    
            }                
        }
        this.next_question_index++;
        console.log(this.current_question_index);
    } */

    toggleFirstButton() {
        let btn_next = document.getElementById("btn_next");
        if (this.current_question_index === 0) {
            btn_next.innerHTML = "Next Question";
        }
        else if (this.current_question_index == this.question_amount-1) {
            btn_next.innerHTML = "Submit Your Answers";
        }
        else if (this.current_question_index == this.question_amount) {
            btn_next.innerHTML = "Try Again";
        }
    }

    /* toggleSecondButton() {
        console.log("inside second button");
        console.log(this.current_question_index);
        console.log(this.no_of_buttons);
        if ((this.current_question_index === 1) && (this.no_of_buttons === 1)) {
            
            let this_class = this;
            let back_button = document.createElement('button');
            back_button.setAttribute("id", "back_btn");
            back_button.classList.add("btn");
            back_button.innerText = "Previous Question";
            let section = document.getElementById("quiz_body");
            let next_button = document.getElementById("btn_next");
            back_button.addEventListener("click", function(){
                this_class.goBack();
            });
            section.insertBefore(back_button, next_button);
            this_class.no_of_buttons++;
            
        }
        else if ((this.current_question_index === 0) && (this.no_of_buttons === 2)) {
            let back = document.getElementById("back_btn");
            back.remove();
            this.no_of_buttons--;
        }                    
    } */

    /* goBack(from_question_index){
        if (this.current_question_index > -1){
            this.rememberAnswers();
        }             
        this.current_question_index--;
        this.publishQuestion(from_question_index);
        this.toggleSecondButton();
        
         
    } */

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
        //Dont do this on the "ready screen"
        if (this.current_question_index > 0){
            //Creates an array of booleans with player answers
            let answers = document.querySelectorAll("li.option");            
            let answer_array = Array.from(answers);
            answer_array = answer_array.map(function(element) {
                return element.classList.value;
            });
            answer_array = answer_array.map(x => x.includes("active"));
            let player_answers = this.player.answer_list;
            player_answers[this.current_question_index-1] = answer_array;
            console.log("Array of player answers below");
            console.log(player_answers);      
        }
    }

    /* fillAnswersFromMemory(){
        let player_answers = this.player.answer_list;
        console.log(player_answers);
        if (this.current_question_index > -1) {
            let options = document.querySelectorAll("li.option");
            let options_array = Array.from(options);
            console.log(options_array);
            for (let i = 0; i < options_array.length; i++) {
                let current_option = document.getElementById(i)
                console.log(player_answers[i]);
                if (player_answers[i] === true) {
                    current_option.classList.add("active");
                }
            }
        }        
    }  */

    /* correct() {
        let player_answers = this.player.answer_list;
        let score = this.player.score;
        let possible_score = this.player.possible_score; 
        console.log("%%%%%%%%%%%%   ENTERING CORRECT METHOD   %%%%%%%%%%%%%%%%%");
        console.log("player_answers below");
        console.log(player_answers);
        for (let i = 0; i < this.question_amount; i++) {
            console.log("i below");
            console.log(i);            
            console.log("player_answers[i] below");
            console.log(player_answers[i]);
            let corr_answers = this.question_list.list[i].correct_answers;
            console.log("corr_answers below");
            console.log(corr_answers);
            //Count the number of correct answers in each question
            let corr_answers2 = corr_answers.filter(Boolean).length;
            console.log("corr_answers2 below");
            console.log(corr_answers2);
            possible_score += corr_answers2;
            for (let j = 0; j <player_answers[i].length; j++) {
                console.log("j below");
                console.log(j);
                console.log("player_answers[i][j] below");
                console.log(player_answers[i][j]);
                console.log("corr_answers[j] below");
                console.log(corr_answers[j]);
                if ((player_answers[i][j] === corr_answers[j]) && (player_answers[i][j] === true)) {
                    score++;
                    console.log("SCORE!!!!");
                }
                console.log("score below");
                console.log(score);
            }
        }
        this.player.possible_score = possible_score;
        this.player.score = score;
        console.log("score below");
        console.log(score);
        console.log("possible_score below");
        console.log(possible_score);
        console.log(this.player.possible_score);
    } */

    correct() {
        let player_answers = this.player.answer_list;
        let score = 0;
        let possible_score = this.player.possible_score; 
        console.log("------------   ENTERING CORRECT METHOD 2222222   ------------");
        console.log("player_answers below");
        console.log(player_answers);
        for (let i = 0; i < this.question_amount; i++) {
            console.log("i below");
            console.log(i);            
            console.log("player_answers[i] below");
            console.log(player_answers[i]);
            let corr_answers = this.question_list.list[i].correct_answers;
            console.log("corr_answers below");
            console.log(corr_answers);
            //Count the number of correct answers in each question
            let corr_answers2 = corr_answers.filter(Boolean).length;
            console.log("corr_answers2 below");
            console.log(corr_answers2);
            possible_score += corr_answers2;
            for (let j = 0; j <player_answers[i].length; j++) {
                console.log("j below");
                console.log(j);
                console.log("player_answers[i][j] below");
                console.log(player_answers[i][j]);
                console.log("corr_answers[j] below");
                console.log(corr_answers[j]);
                if (player_answers[i][j] !== corr_answers[j]) {
                    break
                }
                else
                console.log(i+"was correct!");
                score++;
                console.log("score below");
                console.log(score);
            }
        }
        this.player.possible_score = possible_score;
        this.player.score = score;
        console.log("score below");
        console.log(score);
        console.log("possible_score below");
        console.log(possible_score);
        console.log(this.player.possible_score);
    }

    scorePage() {
        //Increasing index
        /* this.current_question_index++;   */     
        this.toggleFirstButton();
        /* this.toggleSecondButton(); */
        document.getElementById("user_welcome").innerHTML = "Congratulations "+ this.player.name + "!";
        let question_field = document.getElementById("question_field");
        let option_group = document.getElementById("option_group");
        option_group.innerHTML = "";
        console.log("I'm about to display THE SCORE PAGE");
        console.log(this.current_question_index);
        question_field.innerText = "You have completed the quiz:"
        for (let i = 0; i < 3; i++) {
            let li_option = document.createElement('li');
            li_option.setAttribute("id", i);
            li_option.classList.add("option");
            option_group.append(li_option);
        }
        document.getElementById(0).innerHTML = "There were "+this.question_amount+" questions.";
        document.getElementById(1).innerHTML = "There were "+this.player.possible_score+" possible correct answers.";
        document.getElementById(2).innerHTML = "Your score was "+this.player.score+" out of "+this.player.possible_score+".";
    }
}
