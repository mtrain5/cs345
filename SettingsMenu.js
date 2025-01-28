/*
To add a new menu button:
Everything is done in this file.

Initialize a new button below like "let testButton = new SettingsButton('test', x, y)"

'test' is the buttons function, and the text that will display on the button.
x and y are the top left corner coordinates.

The Y should be 40 greater than the previous buttons Y, unless that would make the button go off screen,
in which case the Y for the second row should begin with the first button at 50 and subsequent buttons 40 more
than the previous button.

The x value for the first row is 40, the x value for the second row is 310

Once the button is initialized add settingsButtons.push(ButtonName); to the constructor below

Then create a custom function for the button at the bottom of this file.

Then add, for example:
                    else if (action == 'test') {
                        custom function;
                    }
To the menuButtonClicked function below.
*/

let settingsButtons = [];

//Initialize Buttons here
let showBallsButton = new SettingsButton('Theme Selection', 175, 50);
let toggleBallQueue = new SettingsButton('Ball Queue On', 175, 130);
let timersettings = new SettingsButton('Timer Settings', 175, 90);
let deleteSaveData = new SettingsButton('No Saved Data', 175, 250);
let difficulty = new SettingsButton('Difficulty: Medium', 175, 170);
let music = new SettingsButton('Music On', 175, 210);





class SettingsMenu {

    //Add Button to settingsButtons after initialization
    constructor() {
        this.open = false;
        settingsButtons.push(showBallsButton);
        settingsButtons.push(toggleBallQueue);
        settingsButtons.push(timersettings);
        settingsButtons.push(deleteSaveData);
        settingsButtons.push(difficulty);
        settingsButtons.push(music);
        this.themeColor = "#B41297";
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

    runSettingsMenu() {
        fill('black');
        stroke(this.themeColor);
        rect(10, 10, 580, 480);
        noStroke();
        fill(this.themeColor);
        text("SETTINGS:", 300, 32);
        ToMenuButton.displayButton();
        exitable = true;
        for (let i = 0; i < settingsButtons.length; i++) {
            settingsButtons[i].displayButton();

        }
    }

    setThemeColor(color) {
        this.themeColor = color;
    }

    getThemeColor() {
        return this.themeColor;
    }
}



//Add button-specific-action as an else if statement that calls a custom function, in this function.
function menuButtonClicked(action) {
    if (action == 'Theme Selection') {                 //Check for action
        ShowBalls();                                   //If the button clicked has this action, a function will be performed
    }
    if ((action == 'Ball Queue Off') | (action == 'Ball Queue On')) {
        customDiff();
        toggleQueue();
    }
    if (action == 'Timer Settings') {
        timermenu.setOpenTrue();
    }
    if (action == 'Delete Saved Data') {
        deleteSavedData();
    }
    if ( ( (action == "Difficulty: Easy") | (action == "Difficulty: Medium") ) | (action == "Difficulty: Hard") | (action == "Difficulty: Custom")){
        nextDiff();
    }
    if (action == "Music On") {
        settingsButtons[5] = new SettingsButton("Music Off", 175, 210);
        backgroundMusic.pause();
        instance.musicOn = false;
    }
    if (action == "Music Off") {
        settingsButtons[5] = new SettingsButton("Music On", 175, 210);
        instance.musicOn = true;
    }
    settingsAndExitButtonNoise.play();
}


// Individual menu button functions below:


function ShowBalls() {
    ballViewer.setOpenTrue();
}

function toggleQueue() {
    instance.displayQueue = !instance.displayQueue;
    if(instance.displayQueue){
        settingsButtons[1] = new SettingsButton('Ball Queue On', 175, 130);
    }
    else{
        settingsButtons[1] = new SettingsButton('Ball Queue Off', 175, 130);
    }

}

function deleteSavedData() {
    if (saver.getSaved()) {
        saver = new saveButton();
        settingsButtons[3] = new SettingsButton('No Saved Data', 175, 250);
    }

}

function customDiff() {
    settingsButtons[4] = new SettingsButton("Difficulty: Custom", 175, 170);
    instance.MaxRandomBall = 7;
    DropTimer = 1000;
    FailingHeight = 150;
}

function nextDiff(){
    instance.Difficulty = (instance.Difficulty + 1) % 3;
    switch (instance.Difficulty){

    case 0:
        settingsButtons[4] = new SettingsButton('Difficulty: Easy', 175, 170);
        if (instance.displayQueue == false){
            toggleQueue();
        }
        instance.MaxRandomBall = 11;
        TimerOn = false;
        DropTimer = 750;
        FailingHeight = 150;
        break;

    case 1:
        settingsButtons[4] = new SettingsButton('Difficulty: Medium', 175, 170);
        if (instance.displayQueue == false){
            toggleQueue();
        }
        instance.MaxRandomBall = 7;
        TimerSet = 1200;
        TimerOn = true;
        DropTimer = 1000;
        FailingHeight = 150;
        break;

    default:
        settingsButtons[4] = new SettingsButton('Difficulty: Hard', 175, 170);
        if ( instance.displayQueue == true){
            toggleQueue();
        }
        instance.MaxRandomBall = 4;
        TimerSet = 600; //had to change this to keep timer at 5 minute intervals
        DropTimer = 1000;
        FailingHeight = 200;
    }

    instance.resetBallArray();
}
