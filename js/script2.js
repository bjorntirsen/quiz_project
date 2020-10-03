document.addEventListener("DOMContentLoaded", async function () {
    let my_game = new Game();
    let btn_next = document.getElementById("btn_next");
    await my_game.question_list.fetchQuestions(my_game.question_amount);
    btn_next.addEventListener("click", function () {
        console.log(my_game.current_question_index);
        my_game.goToNext(my_game.current_question_index);
        if (my_game.current_question_index != 0){
            my_game.toggleSecondButton();
        }        
    });
})