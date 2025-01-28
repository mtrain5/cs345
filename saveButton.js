


var width;
var height;
var x;
var y;
var time;
var savedBalls = [];
var saving = false;
var saved = false;
var savedBallCombinations;
var timerState = false;

class saveButton {


    constructor() {
        this.width = 200;
        this.height = 30;
        this.x = 200;
        this.y = 465;
    }

    displayButton() {
         stroke("Black");
         fill("Grey");
         rect(this.x, this.y, this.width, this.height);
         noStroke();
         fill("Black");
         textAlign(CENTER, CENTER);
         textSize(25);
         if (this.saving) {
            text("Saving: ON", this.x + this.width / 2, this.y + this.height / 2 + 1);
         } else {
            text("Saving: OFF", this.x + this.width / 2, this.y + this.height / 2 + 1);
         }
     }

     getSaving() {
        return this.saving;
     }
    
     setSaving(bool) {
        this.saving = bool;
     }

     setSaved(bool) {
        this.saved = bool;
     }

     getSaved() {
        return this.saved;
     }

     getTime() {
        return this.time;
     }

     setTime(time) {
        this.time = time;
     }

     setSavedBallArray(balls) {
        this.savedBalls = balls;
     }

     getSavedBallArrayCopy() {
        let temp = [];
        for (let i = 0; i < this.savedBalls.length; i++) {
          temp.push(this.savedBalls[i].makeCopy());
        }
        return temp;
     }

     setSavedBallCombinations(number) {
        this.savedBallCombinations = number;
     }

     getSavedBallCombinations() {
        return this.savedBallCombinations;
     }

     setTimer(bool) {
      this.timerState = bool;
     }

     getTimer() {
      return this.timerState;
     }
}

function saveButtonClicked() {
    if (!saver.getSaving()) {
        saver.setSaving(true);
    } else {
        saver.setSaving(false);
    }
}

function saveTheGame() {
   saver.setSaved(true);
   settingsButtons[3] = new SettingsButton('Delete Saved Data', 175, 250);
   saver.setTime(timermenu.getTimeLeft());
   saver.setSavedBallArray(instance.getBallArrayCopy());
   saver.setSavedBallCombinations(instance.getBallCombinations());
}
