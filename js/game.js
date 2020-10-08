class Game {
    constructor() {
        this.player = new Player();
        this.question_list = new Question_list();
        this.question_list.fetchQuestions(this.question_amount, this);
        this.displayReadyPage();
        this.current_question_index = -1;        
        this.no_of_timers = 0;
        this.timer = null;               
    }

    displayReadyPage() {
        document.getElementById("user_welcome").innerHTML += this.player.name + "!";
        let question_field = document.getElementById("question_field");
        let option_group = document.getElementById("option_group");
        option_group.innerHTML = "";
        let li_option = document.createElement('li');
        li_option.setAttribute("id", "fetching");
        li_option.innerText = "Fetching questions..."
        option_group.append(li_option);
        question_field.innerHTML = "Are you ready to start the Quiz?";
    }

    initializeNextButton() {        
        let that = this;
        let btn_next = document.getElementById("btn_next");
        btn_next.innerHTML = "Start";
        btn_next.addEventListener("click", function () {
            that.nextQuestion();
            if ((that.no_of_timers === 0) && (that.current_question_index === 0)) {
                that.timer = new Timer();
                that.no_of_timers++;
            }  
        });
        btn_next.classList.remove("invisible")
    }
    //Method executed when clicking "next" button
    nextQuestion() {
        this.current_question_index++;       
        //If you've reached the score screen of quiz you can start over
        if (this.current_question_index == (this.question_list.question_amount + 1)) {
            location.href = "index.html";
        }
        else
        //Method to control the text of the "next" button
        this.toggleFirstButton();
        let question_field = document.getElementById("question_field");
        let option_group = document.getElementById("option_group");
        this.rememberAnswers();
        option_group.innerHTML = "";
        //If you are at the last question of the quiz
        if (this.current_question_index == this.question_list.question_amount) {
            this.correct();
            this.scorePage();
        }
        //This is the most common "next question" functionality
        else if (this.current_question_index < this.question_list.question_amount) {
            let displayed_question = this.question_list.list[this.current_question_index];
            let corr_answers = this.question_list.list[this.current_question_index].correct_answers;
            //There are some console.logs to use if you want to see the correct answers
            console.log("Now I'm displaying question index: " + this.current_question_index);
            console.log("The correct answers are: "+corr_answers);
            //Displaying question and its number
            question_field.innerText = "Q" + (this.current_question_index + 1) + ": " + displayed_question.question;
            //Displaying all the selectable answers
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
        }
    }
    //Method to control the text of the "next" button
    toggleFirstButton() {
        let btn_next = document.getElementById("btn_next");
        if (this.current_question_index === 0) {
            btn_next.innerHTML = "Next Question";
        }
        else if (this.current_question_index == this.question_list.question_amount - 1) {
            btn_next.innerHTML = "Submit Your Answers";
        }
        else if (this.current_question_index == this.question_list.question_amount) {
            btn_next.innerHTML = "Try Again";
        }
    }
    //Method to make multiple options selectable
    makeOptionsSelectable() {
        let options = document.querySelectorAll("li.option");
        for (let i = 0; i < options.length; i++) {
            options[i].onclick = function () {
                if (options[i].classList.contains("active")) {
                    options[i].classList.remove("active");
                }
                else {
                    options[i].classList.add("active");
                }
            }
        }
    }
    //Method to remember your selected answers
    rememberAnswers() {
        //Dont do this on the "ready screen"
        if (this.current_question_index > 0) {
            //Creates an array of booleans with player answers in two steps
            let answer_array = Array.from(document.querySelectorAll("li.option"));
            answer_array = answer_array.map(x => x.classList.value.includes("active"));
            this.player.answer_list[this.current_question_index - 1] = answer_array;
            console.log("You chose the following answers: " + this.player.answer_list[this.current_question_index - 1]);
        }
    }
    //Check how namy questions you answered correctly
    correct() {
        let player_answers = this.player.answer_list;
        let score = 0;
        let possible_score = this.player.possible_score;
        console.log("All your answers are printed below");
        console.log(player_answers);
        for (var i = 0; i < player_answers.length; i++) {
            let corr_answers = this.question_list.list[i].correct_answers;
            //Count the number of correct answers in each question
            let corr_answers2 = corr_answers.filter(Boolean).length;
            possible_score += corr_answers2;
            //Slicing answers array into equal length
            corr_answers = corr_answers.slice(0, player_answers[i].length);
            //Comparing player answers to correct answers
            if (this.arraysEqual(player_answers[i], corr_answers) == true) {
                console.log("Question index " + i + " was correct");
                score++;
            }
            else console.log("Question index " + i + " was incorrect");
        }
        this.player.possible_score = possible_score;
        this.player.score = score;
    }
    //Help method to correct() checking if two arrays are equal
    arraysEqual(a, b) {
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
    //Method for displaying the score page
    scorePage() { 
        this.toggleFirstButton();
        document.getElementById("user_welcome").innerHTML = "Congratulations " + this.player.name + "!";
        let question_field = document.getElementById("question_field");
        let option_group = document.getElementById("option_group");
        option_group.innerHTML = "";
        let timer = document.getElementById("timer");
        timer.classList.add("invisible");
        question_field.innerText = "You have completed the quiz:"
        for (let i = 0; i < 4; i++) {
            let li_option = document.createElement('li');
            li_option.setAttribute("id", i);
            li_option.classList.add("score");
            option_group.append(li_option);
        }
        document.getElementById(0).innerHTML = "There were " + this.question_list.question_amount + " questions.";
        if (this.player.possible_score != this.question_list.question_amount) {
            document.getElementById(1).innerHTML = "This quiz included questions with multiple correct answers.";
        }
        else {
            document.getElementById(1).innerHTML = "This quiz did not include questions with multiple correct answers.";
        }
        document.getElementById(2).innerHTML = "Your score was " + this.player.score + " out of " + this.question_list.question_amount + ".";
        document.getElementById(3).innerHTML = "It took you " + this.timer.minutes + " minute(s) and " + this.timer.seconds + " second(s) to complete the quiz.";
    }
}