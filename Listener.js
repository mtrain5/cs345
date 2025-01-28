//Listener for all of our buttons


//Put Independant Javascript button declarations here (SettingsMenu Buttons are not independant, for example, they are handled in SettingsMenu.js)
let ToMenuButton = new exit(); //single instance of an exit button



//JavaScript Listening 
function mousePressed() {
    if (mouseX > 560 && mouseX < 590 && mouseY > 10 && mouseY < 40 && exitable == true) {   //Listen for exit button
        exitButtonClicked();
    }
    if (mouseX > 200 && mouseX < 400 && mouseY > 465 && mouseY < 495 && instance.getRunningState() && !instance.getGameOver()) {
      saveButtonClicked();
    }
    if (timermenu.getOpen()) {
      for(let i = 0; i < TimerButtons.length; i++) {
        let button = TimerButtons[i];
        if ((mouseX > button.getXmin() && mouseX < button.getXmax() && mouseY > button.getYmin() && mouseY < button.getYmax())) {
            TimerButtonClicked(button.getAction());
        }
      }
    } else if (ballViewer.getOpen()) {               //listen for menu buttons when appropriate
      if ((mouseX > ballThemeButton.getXmin() && mouseX < ballThemeButton.getXmax() && mouseY > ballThemeButton.getYmin() && mouseY < ballThemeButton.getYmax())) {
          ballThemeClicked(ballThemeButton.getAction());
      }
    } else if (settingsMenu.getOpen()) {               //listen for menu buttons when appropriate
        for(let i = 0; i < settingsButtons.length; i++) {
            let button = settingsButtons[i];
            if ((mouseX > button.getXmin() && mouseX < button.getXmax() && mouseY > button.getYmin() && mouseY < button.getYmax())) {
                menuButtonClicked(button.getAction());
            }
        }
    }  
}

//put independant javascript button functions here

function exitButtonClicked() {
  if (timermenu.getOpen()) {
      timermenu.setOpenFalse();
  } else if (ballViewer.getOpen()) {
      ballViewer.setOpenFalse();
  } else if (settingsMenu.getOpen()) {
      settingsMenu.setOpenFalse();
      exitable = false;
      menuContainer.style.display = "block";
  } else {
      if (saver.getSaving()) {
          saveTheGame();
          saver.setSaving(false); 
      }
      exitable = false;
      menuContainer.style.display = "block";
      scoringit.style.display ="none";
      instance.setRunningFalse();
      instance.setBallArray([]);
      instance.setScore(0);
      //quiting.play();
  }
  settingsAndExitButtonNoise.play();
}



//HTML Button stuff below

const startButton = document.getElementById("Startbutton");
const settingsButton = document.getElementById("Settingsbutton");
const quitButton = document.getElementById("Quitbutton");
const menuContainer = document.getElementById("themenu-container");
const goodbyemode = document.getElementById("goodbye-message");
const scoringit = document.getElementById("scoring"); //newscore
const startsound = document.getElementById("playsound");
const quiting = document.getElementById("quitsound");
startsound.volume = 0.70;
quiting.volume = 0.10;

startButton.addEventListener("click", function() {
  if (saver.getSaved()) {
    setTimer(saver.getTime());
    instance.setBallArray(saver.getSavedBallArrayCopy());
    instance.setBallCombinations(saver.getSavedBallCombinations());
  } else {
    instance.setBallCombinations(0);
    instance.makeGameNotOver();
  }
    instance.setRunningTrue(); //start game
    settingsMenu.setOpenFalse();
    quit = false;
    menuContainer.style.display = "none";
    goodbyemode.style.display ="none";
    // instance.score = 0; //to 0 score
    scoringit.style.display ="block"; // show score only when the play start playing
    instance.displayScore();
    instance.setGameOverCause("");
    startsound.play();
    });
  
  settingsButton.addEventListener("click", function() {
    if (!(instance.getRunningState())) {
      if (!settingsMenu.getOpen()) {
        settingsMenu.setOpenTrue();
        quit = false;
      } else {
        settingsMenu.setOpenFalse();
        quit = false;
        }
      }  
       goodbyemode.style.display ="none";
      menuContainer.style.display = "none";
      scoringit.style.display ="none";//for score
      settingsAndExitButtonNoise.play();
      
    });
  
  quitButton.addEventListener("click", function() {
    if (!(instance.getRunningState()) && !settingsMenu.getOpen()) {
        quit = true;
        menuContainer.style.display = "none";
        showGoodBye(); 
        scoringit.style.display ="none";//scoring
        quiting.play();
        }
    });
  
  function showGoodBye() {
    if (quit){
     goodbyemode.style.display = "block";
     scoringit.style.display ="none";//score
    }  
  }