class Question_list {
    constructor(){
        this.question_amount = sessionStorage.getItem("question_amount");          
        this.list = [];
    }
    async fetchQuestions(question_amount, main_object) {
        let list = this.list;
        await fetch("https://quizapi.io/api/v1/questions?category=code&limit="+question_amount, {
            headers: {
                "X-Api-Key": "IfB2IekyprvvccI060Y5FwUAkczl7pI2CFVJKzhZ",
            }
        })
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < this.question_amount; i++){
                //Turning each question in json to object
                let question = new Question();
                //Converting key-value pairs of object into array and
                //inserting that array into proper place in object
                question.answers = Object.keys(data[i].answers).map((key) => [key, data[i].answers[key]]);
                //Mapping out the keys from the JSON object into an
                //array of true or false in string
                question.correct_answers = Object.keys(data[i].correct_answers).map((key) => [data[i].correct_answers[key]]);
                //Converting the strings to booleans
                question.correct_answers = question.correct_answers.map((val) => (val == "true"));
                question.question = data[i].question;
                list.push(question);
            }  
        });
        main_object.initializeNextButton();
        document.getElementById("fetching").classList.add("invisible");        
    }
    //See if there were multiple answers in the quiz
    whereThereMultipleAnswers(){
        let number_of_correct_answers = 0;
        //Count the number of correct answers in each question
        for (let i = 0; i < this.list.length; i++) {
            number_of_correct_answers += this.list[i].correct_answers.filter(Boolean).length;
        }
        if (number_of_correct_answers != this.question_amount) return true;
        else return false;
    }
    //Check how namy questions you answered correctly
    correct(player_answers) {
        let score = 0;        
        console.log("All your answers are printed below");
        console.log(player_answers);
        for (var i = 0; i < player_answers.length; i++) {
            /* let correct_answers = this.list[i].correct_answers; */            
            //Slicing answers array into same length as player answers
            this.list[i].correct_answers = this.list[i].correct_answers.slice(0, player_answers[i].length);
            //Comparing player answers to correct answers
            if (this.arraysEqual(player_answers[i], this.list[i].correct_answers) == true) {
                console.log("Question index " + i + " was correct");
                score++;
            }
            else console.log("Question index " + i + " was incorrect");
        }
        return score;
    }
    //Help method to correct() checking if two arrays are equal
    arraysEqual(a, b) {
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
}
