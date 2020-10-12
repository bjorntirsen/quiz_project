class Question_list {
    constructor(){
        this.question_amount = sessionStorage.getItem("question_amount");          
        this.list = [];
    }

    //This is the method that fetches the questions from the API
    async fetchQuestions(question_amount, main_object) {
        let list = this.list;
        try {        
            await fetch("https://quizapi.io/api/v1/questions?category=code&limit="+question_amount, {
                headers: {
                    "X-Api-Key": "IfB2IekyprvvccI060Y5FwUAkczl7pI2CFVJKzhZ",
                }
            })
            .then((response) => response.json())
            .then((data) => {
                for (let i = 0; i < this.question_amount; i++){
                    //Turning the response from the API into question objects
                    let question = new Question();
                    //Here we are taking the key-value pairs of answers and
                    //inserting them in the answers array of the object.
                    //Like this: [ 'answer_a', 'ceil(x, y)' ]
                    question.answers = Object.keys(data[i].answers).map((key) => [key, data[i].answers[key]]);
                    //We then do the same for the correct answers
                    question.correct_answers = Object.keys(data[i].correct_answers).map((key) => [data[i].correct_answers[key]]);
                    //But here we are also then converting that array into
                    //an array of booleans.
                    //Like this: [ false, true, false, false, false, false ]
                    question.correct_answers = question.correct_answers.map((val) => (val == "true"));
                    //Both of the above arrays will have the length 6.
                    //Below its just a single string we are adding each time.
                    question.question = data[i].question;
                    question.tag = data[i].tags[0].name;
                    question.difficulty = data[i].difficulty;
                    //Finally we are pushing the question object into our list array.
                    list.push(question);
                }  
            });
            main_object.initializeNextButton();
            document.getElementById("fetching").classList.add("invisible");
        }
        catch (error) {
            alert("I was not able to get the questions. Please check your browser's internet connection and then reload this page.")
        }    
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
        console.log("All your answers are printed below:");
        console.log(player_answers);
        for (var i = 0; i < player_answers.length; i++) {          
            //Slicing answers array into same length as player answers
            this.list[i].correct_answers = this.list[i].correct_answers.slice(0, player_answers[i].length);
            //Comparing player answers to correct answers
            if (this.arraysEqual(player_answers[i], this.list[i].correct_answers) == true) {
                console.log("Question index " + i + " was correct.");
                score++;
            }
            else console.log("Question index " + i + " was incorrect.");
        }
        return score;
    }
    
    //Help method to correct(), checking if two arrays are equal
    arraysEqual(a, b) {
        for (var i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }
}
