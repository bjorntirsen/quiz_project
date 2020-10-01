class Question_list {
    constructor(){
        this.question_amount = sessionStorage.getItem("question_amount");          
        let list = [];
        this.fetchQuestions();
    }
    fetchQuestions() {
        fetch("https://quizapi.io/api/v1/questions?category=code&limit="+this.question_amount, {
            headers: {
                "X-Api-Key": "IfB2IekyprvvccI060Y5FwUAkczl7pI2CFVJKzhZ",
            }
        })
        .then((response) => response.json())
        .then((json) => {
            for (let i = 0; i < this.question_amount; i++){
                //Turning each question in json to object
                let question = new Question();
                //Converting key-value pairs of object into array and
                //inserting that array into proper place in object
                question.answers = Object.keys(json[i].answers).map((key) => [key, json[i].answers[key]]);
                question.category = json[i].category;        
                question.correct_answer = json[i].correct_answer;
                question.correct_answers = Object.keys(json[i].correct_answers).map((key) => [key, json[i].correct_answers[key]]);
                question.description = json[i].description;
                question.difficulty = json[i].difficulty;
                question.explanation = json[i].explanation;
                question.id = json[i].id;
                question.multiple_correct_answers = json[i].multiple_correct_answers;
                question.question = json[i].question;
                /* question.tags = json[i].tags; */
                question.tip = json[i].tip;
                this.list.push(question);
            }
        });
    }
}

/* fetch("https://randomuser.me/api/")
.then(response => response.json())
.then(data => {
let first = data.results[0].name.first;
let last = data.results[0].name.last;
let email = data.results[0].email;
let randomPerson = new RandomPerson(first, last, email);
console.log(randomPerson); 
});*/
