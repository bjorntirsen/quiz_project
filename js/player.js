class Player {
    constructor(){
        this.name = sessionStorage.getItem("name");
        this.answer_list = new Array(sessionStorage.getItem("question_amount")).fill(null);

    }
    next(){
        this.question_count++;
    }
}