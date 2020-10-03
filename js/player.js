class Player {
    constructor(){
        this.name = sessionStorage.getItem("name");
        this.answer_list = [];
        
    }
    next(){
        this.question_count++;
    }
}