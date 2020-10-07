class Form {
    constructor() {        
        this.initializeSubmitButton();
    }
    submitForm() {
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
        else {
            alert("Please enter your name");
            document.getElementById("input_field").focus();
        }
    }

    initializeSubmitButton() {
        let that = this;
        let submit_button = document.getElementById("submit_button");
        submit_button.addEventListener("click", function(event){
            /* Preventing error from submit button below */
            event.preventDefault(event);
            that.submitForm();
        })
    }
}