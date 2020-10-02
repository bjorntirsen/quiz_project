document.addEventListener("DOMContentLoaded", async function(e){
    let my_game = new Game();
    let btn_next = document.getElementById("btn_next");
    await my_game.question_list.fetchQuestions(my_game.question_amount);
    console.log(my_game.question_list.list.length);
    btn_next.addEventListener("click", function(e){
        my_game.goToNext();
    })
})