

let TimerButtons = [];
let Timer = 600;
let TimerSet = 600;
let TimerMax;
let TimerOn = true;

let timerLengthUp = new SettingsButton("+", 375, 200, 100, 100);
let timerLengthDown = new SettingsButton("-", 125, 200, 100, 100);
let timerToggle = new SettingsButton("Toggle", 250, 200, 100, 100);





class TimerMenu {

    constructor() {
        this.open = false;
        TimerButtons.push(timerLengthUp);
        TimerButtons.push(timerLengthDown);
        TimerButtons.push(timerToggle);
    }

    getOpen() {
        return this.open;
    }

    setOpenFalse() {
        this.open = false;
    }

    setOpenTrue() {
        this.open = true;
    }

    getTimeLeft() {
        const d = new Date();
        Timer = d.getTime();
        return Math.floor((TimerMax - Timer) / 1000) + 1;
    }


    setTimerOn() {
        this.TimerOn = true;
    }
    setTimerOff() {
        this.TimerOn = false;
    }
    getTimerOn() {
        return TimerOn;
    }

    runTimerMenu() {
        fill('black');
        stroke(settingsMenu.getThemeColor());
        rect(10, 10, 580, 480);
        noStroke();
        fill(settingsMenu.getThemeColor());
        text("TIMER SETTINGS:", 130, 27);
        ToMenuButton.displayButton();
        exitable = true;
        for (let i = 0; i < TimerButtons.length; i++) {
            TimerButtons[i].displayButton();
        }
        if (this.getTimerOn()) {
            text("TIMER IS ON", 300, 150);
            if (TimerSet == 3600) {
                text("Timer Duration: 1 Hour", 300, 350);
            } else {
                text("Timer Duration: " + TimerSet/60 + " Minutes", 300, 350);
            }
        } else {
            text("TIMER IS OFF", 300, 150);
            text("Timer Duration: OFF", 300, 350);
        }
    }
}

function TimerButtonClicked(action) {
    if (action == '+') {                
        increaseTimer();                             
    }
    if (action == '-') {
        decreaseTimer();

    }
    if (action == "Toggle") {
        TimerOn = !TimerOn;
    }
    customDiff();
    settingsAndExitButtonNoise.play();
}

function increaseTimer() {
    if (!timermenu.getTimerOn()) {
        TimerOn = true;
    } else {
        if (TimerSet <= 3300) {
            TimerSet += 300;
        }
    }
}

function decreaseTimer() {
    if (TimerSet > 300) {
        TimerSet -= 300;
    } else {
        TimerOn = false;
    }
}

function setTimer(time) {
    timerSet = time;
}

//In order to keep the code as organized as possible this method shouldnt be changed anymore.
//Ending the game should be handled in the game class in the makeGameOver function.
function runTimer() {
    const currentTime = new Date().getTime();
    if (currentTime > TimerMax + 1000) {
      instance.makeGameOver();
    } else {
      Timer = currentTime;
      fill("White");
      var timeLeft = Math.floor((TimerMax - Timer) / 1000) + 1;
      if (timeLeft % 60 < 10) {
        text(Math.floor(timeLeft / 60) + ":0" + timeLeft % 60, 300, 30);
      } else {
        text(Math.floor(timeLeft / 60) + ":" + timeLeft % 60, 300, 30);
      }
      noFill();
    }  
}