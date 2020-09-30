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
                let question = new Question();
                question.question = json[i].question;
                question.correct_answer = json[i].correct_answer;
                question.answer_a = json[i].answer_a;
                question.answer_b = json[i].answer_b;
                question.answer_c = json[i].answer_c;
                question.answer_d = json[i].answer_d;
                question.answer_e = json[i].answer_e;
                question.answer_f = json[i].answer_f;
            }
        });
    }
}

fetch("https://randomuser.me/api/")
.then(response => response.json())
.then(data => {
let first = data.results[0].name.first;
let last = data.results[0].name.last;
let email = data.results[0].email;
let randomPerson = new RandomPerson(first, last, email);
console.log(randomPerson);
});
