class Question_list {
    constructor(){
        this.question_amount = sessionStorage.getItem("question_amount");          
        this.list = [];
    }
    async fetchQuestions(question_amount) {
        const url = "https://quizapi.io/api/v1/questions?category=code&limit=";
        try {
            const response = await fetch(url+question_amount, {
                headers: {
                    "X-Api-Key": "IfB2IekyprvvccI060Y5FwUAkczl7pI2CFVJKzhZ",
                }
            });
            const data = await response.json();
            for (let i = 0; i < question_amount; i++){
                console.log(data);
                //Turning each question in json to object
                let question = new Question();
                //Converting key-value pairs of object into array and
                //inserting that array into proper place in object
                question.answers = await Object.keys(data[i].answers).map((key) => [key, data[i].answers[key]]);
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
                this.list.push(question);
                console.log(list[i]);
            }  
        }
        catch (err) {
            console.log(err);
        }     
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
