class Player {
    constructor(){
        this.name = sessionStorage.getItem("name");
        

    }
    next(){
        this.question_count++;
    }
}
class Answer_list {
    constructor(){

    }
}