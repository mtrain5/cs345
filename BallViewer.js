//Displays a screen showing one of each of 11 ball levels.
// In the future, this could be used for changing ball "skins",
// but for now, it just shows the user all the different types.

let ballThemeButton = new SettingsButton("Change Theme", 200, 380, 225, 50);


var ballLevels = [];

class BallViewer {

    constructor() {
        this.open = false;
        let constant = 55;
        let constant2 = 535;
        for (let i = 1; i < 12; i++) {
            if (i < 8) {
                let ball = new Ball(i, constant + (20 + 10 * i)/2, 160);
                ballLevels.push(ball);
                constant += (20 + 10 * i) + 10;
            } else {
                let ball = new Ball(i, constant2 - (20 + 10 * i)/2, 300);
                ballLevels.push(ball);
                constant2 -= (20 + 10 * i) + 10;
            }
        }
    }
        

    drawBallArray() {
        for (i = 1; i < 12; i++) {
            ball = ballLevels[i];
            ball.toScreen();
        }
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

    runBallViewer() {
        fill('black');
        stroke(settingsMenu.getThemeColor());
        rect(10, 10, 580, 480);
        noStroke();
        fill(settingsMenu.getThemeColor());
        text("THEME SELECTION", 300, 32);
        ToMenuButton.displayButton();
        exitable = true;
        for (let i = 0; i < 11; i++) {
            let ball = ballLevels[i];
            ball.to_screen();
        }
        //button for changing the ball type.
        ballThemeButton.displayButton();

    }
}

function ballThemeClicked(action) {
    if (action == "Change Theme") {
        // Change BallTheme
        instance.BallTheme = (instance.BallTheme + 1) % 3;

        // Update the background based on the new BallTheme
        if (instance.BallTheme === 1) {
            instance.selectbg = 1;  // Sports background
            document.body.style.backgroundImage = 'url("assets/R.jpeg")';
            settingsMenu.setThemeColor("tan");
        } else if (instance.BallTheme === 2) {
            instance.selectbg = 2;  // Fruit background
            document.body.style.backgroundImage = 'url("assets/white_background.png")';
            settingsMenu.setThemeColor("lightblue");
        } else {
            instance.selectbg = 0;  // Default running background
            document.body.style.backgroundImage = 'url("assets/Space Background.png")';
            settingsMenu.setThemeColor("#B41297");
        }
    }

    // Play the sound effect for the button click
    settingsAndExitButtonNoise.play();
}




