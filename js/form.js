class Form {
    constructor(){                
    }
    submitForm(){
        if (document.getElementById("input_field").value.trim() != "") {
            //Getting and storing player name in session storage
            let name = document.getElementById("input_field").value;
            sessionStorage.setItem("name", name);
            //Getting and storing question amount in session storage
            let question_amount = 5;
            if (document.getElementById("radio_10").checked) {
                question_amount = 10;
            }        
            sessionStorage.setItem("question_amount", question_amount);
            location.href = "quiz.html";
        }
        else
        alert("Please enter your name")
        focus.getElementById("input_field");
    }
}