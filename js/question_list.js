/* class Question_list {
    constructor(){
        this.question_amount = sessionStorage.getItem("question_amount");          
        let list = [];
        for (let i = 0; i<this.question_amount; i++) {

        }
    }
    fetchQuestions() {
        fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
        let first = data.results[0].name.first;
        let last = data.results[0].name.last;
        let email = data.results[0].email;
        let randomPerson = new RandomPerson(first, last, email);
        list.addPerson(randomPerson);
    
    })
    }
} */
ten questions
https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&category=code&difficulty=Easy&limit=10

five questions
https://quizapi.io/api/v1/questions?apiKey=YOUR_API_KEY&category=code&difficulty=Easy&limit=5


fetch("https://randomuser.me/api/")
.then(response => response.json())
.then(data => {
let first = data.results[0].name.first;
let last = data.results[0].name.last;
let email = data.results[0].email;
let randomPerson = new RandomPerson(first, last, email);
console.log(randomPerson);
});
