class Game {
    constructor() {
        this.player = new Player();
        this.displayReadyPage();
        this.question_amount = sessionStorage.getItem("question_amount");
        this.current_question_index = -1;
        this.question_list = new Question_list();
        this.no_of_buttons = 1;
        this.no_of_timers = 0;
        this.timer = null;
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
            if ((that.no_of_timers === 0) && (that.current_question_index === 0)) {
                that.timer = new Timer();
                that.no_of_timers++;
            }  
        });
    }

    //Method used when clicking "next" button
    nextQuestion() {
        this.current_question_index++;
        console.log("I'm about to display question index: " + this.current_question_index);
        //If you've reached end of quiz you can start over
        if (this.current_question_index == (Number(this.question_amount) + 1)) {
            location.href = "index.html";
        }
        else
        this.toggleFirstButton();
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
            question_field.innerText = "Q" + (this.current_question_index + 1) + ": " + displayed_question.question;
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

    toggleFirstButton() {
        let btn_next = document.getElementById("btn_next");
        if (this.current_question_index === 0) {
            btn_next.innerHTML = "Next Question";
        }
        else if (this.current_question_index == this.question_amount - 1) {
            btn_next.innerHTML = "Submit Your Answers";
        }
        else if (this.current_question_index == this.question_amount) {
            btn_next.innerHTML = "Try Again";
        }
    }


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

    rememberAnswers() {
        //Dont do this on the "ready screen"
        if (this.current_question_index > 0) {
            //Creates an array of booleans with player answers
            let answers = document.querySelectorAll("li.option");
            let answer_array = Array.from(answers);
            answer_array = answer_array.map(function (element) {
                return element.classList.value;
            });
            answer_array = answer_array.map(x => x.includes("active"));
            let player_answers = this.player.answer_list;
            player_answers[this.current_question_index - 1] = answer_array;
            console.log("Array of player answers below");
            console.log(player_answers);
        }
    }

    correct() {
        let player_answers = this.player.answer_list;
        let score = 0;
        let possible_score = this.player.possible_score;
        console.log("player_answers below");
        console.log(player_answers);
        for (var i = 0; i < player_answers.length; i++) {
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
            //Slicing answers array into equal length
            corr_answers = corr_answers.slice(0, player_answers[i].length);
            //Comparing player answers to correct answers
            if (this.arraysEqual(player_answers[i], corr_answers) == true) {
                console.log(i + "was correct");
                score++;
            }
            else console.log(i + "was incorrect");
        }
        this.player.possible_score = possible_score;
        this.player.score = score;
    }

    arraysEqual(a, b) {
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    //Displaying the score page
    scorePage() { 
        this.toggleFirstButton();
        document.getElementById("user_welcome").innerHTML = "Congratulations " + this.player.name + "!";
        let question_field = document.getElementById("question_field");
        let option_group = document.getElementById("option_group");
        option_group.innerHTML = "";
        let timer = document.getElementById("timer");
        timer.classList.add("invisible");
        console.log("I'm about to display THE SCORE PAGE");
        console.log(this.current_question_index);
        question_field.innerText = "You have completed the quiz:"
        for (let i = 0; i < 4; i++) {
            let li_option = document.createElement('li');
            li_option.setAttribute("id", i);
            li_option.classList.add("score");
            option_group.append(li_option);
        }
        document.getElementById(0).innerHTML = "There were " + this.question_amount + " questions.";
        if (this.player.possible_score != this.question_amount) {
            document.getElementById(1).innerHTML = "This quiz included questions with multiple correct answers.";
        }
        else {
            document.getElementById(1).innerHTML = "This quiz did not include questions with multiple correct answers.";
        }
        document.getElementById(2).innerHTML = "Your score was " + this.player.score + " out of " + this.question_amount + ".";
        document.getElementById(3).innerHTML = "It took you " + this.timer.minutes + " minute(s) and " + this.timer.seconds + " second(s) to complete the quiz.";
    }
}
