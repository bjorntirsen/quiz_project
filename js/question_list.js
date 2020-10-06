class Question_list {
    constructor(){
        this.question_amount = sessionStorage.getItem("question_amount");          
        this.list = [];
    }
    fetchQuestions(question_amount) {
        const list = this.list;
        fetch("https://quizapi.io/api/v1/questions?category=code&limit="+question_amount, {
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
                question.category = data[i].category;        
                question.correct_answer = data[i].correct_answer;
                question.correct_answers = Object.keys(data[i].correct_answers).map((key) => [key, data[i].correct_answers[key]]);
                question.description = data[i].description;
                question.difficulty = data[i].difficulty;
                question.explanation = data[i].explanation;
                question.id = data[i].id;
                question.multiple_correct_answers = data[i].multiple_correct_answers;
                question.question = data[i].question;
                /* question.tags = data[i].tags; */
                question.tip = data[i].tip;
                list.push(question);
            }  
        });
    }
}
