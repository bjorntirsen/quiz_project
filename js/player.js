class Player {
    constructor(){
        this.name = sessionStorage.getItem("name");
        this.answer_list = [];
        this.answer_list.length = sessionStorage.getItem("question_amount");
    }
    next(){
        this.question_count++;
    }
}