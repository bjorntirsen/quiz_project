class Player {
    constructor(){
        this.name = sessionStorage.getItem("name");
        this.answer_list = [];
        this.answer_list.length = sessionStorage.getItem("question_amount");
        this.answer_list.fill(0);
        this.score = 0;
    }
}