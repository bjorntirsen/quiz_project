class Timer {
    constructor(){
        this.seconds = 0;
        this.formatted_seconds = 0;
        this.minutes = 0;
        this.formatted_minutes = 0;
        let that = this;
        this.time = 0;
        setInterval(function() {
            if(that.seconds < 59) {
                that.seconds++;
            }
            else {
                that.minutes++;
                that.seconds = 0;
            }            
            if (that.seconds < 10) {
                that.formatted_seconds = "0" + that.seconds;
            }
            else {
                that.formatted_seconds = that.seconds;
            }
            if (that.minutes < 10) {
                that.formatted_minutes = "0" + that.minutes;
            }
            else {
                that.formatted_minutes = that.minutes;
            }
            that.time = that.formatted_minutes+":"+that.formatted_seconds;
            document.getElementById("timer").innerHTML = that.time;
        }, 1000);
    }
}