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
    }
}
