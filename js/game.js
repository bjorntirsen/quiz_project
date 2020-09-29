class Game {
    constructor(){
        //Getting and storing player name in session storage
        let name = document.getElementById("input_field").value;
        //Creating player object
        this.player = new Player(name);
        this.question_count = 0;
        //Redrawing HTML body
        
    }
    /* clearPage(){
        let section = document.getElementById("wrapper");
        section.innerHTML = "";
    }
    drawQuizForm(){
        let quiz_div = document.createElement("div");
        quiz_div.classList.add("quiz")
        section.append(quiz_div);
        
        let quiz_header = document.createElement("header");
        quiz_div.classList.add("quiz_header")
        quiz_div.append(quiz_header);

        let quiz_user = document.createElement("div");
        quiz_div.classList.add("quiz_header")
        quiz_div.append(quiz_header);

        let editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        // add eventlistener till dessa nya knappar som skapas + de två som finns från början
        //lägg till id på knappen (samma som lastRow++)
        row.append(editButton);
    } */
}