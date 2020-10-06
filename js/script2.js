document.addEventListener("DOMContentLoaded", async function () {
    let my_game = new Game();
    await my_game.question_list.fetchQuestions(my_game.question_amount);
    my_game.initializeNextButton();    
})