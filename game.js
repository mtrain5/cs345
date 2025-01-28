/*
    Class to manage basic game functions in, so that we can draw
    the game by instance.run() in sketch.js).
*/
let container;
let bgurl = 'url("assets/Space Background.png")';
class Game {

    //This sets the running state of the game to false when the game is created.
    constructor() {
        this.running = false;    //running = true if running & vice versa
        this.score = 0;// for score problem is here it neve updating.
        this.ballCombinations = 0;
        this.BallArray = [];
        this.BallQueue = [];
        this.displayQueue = true;
        this.gameOver = false;
        this.BallTheme = 0;
        this.BallThemes = [];
        this.Difficulty = 1;
        this.MaxRandomBall = 6;
        this.selectbg = 0; //determine background
        this.gameOverCause = ''; // there are two  reasons the game 
                              //can stop a -the timer runs out or the line is crossed   
        this.musicOn = true;
    }

    //This draws game elements (container, background, balls).
    run() {

        if (this.selectbg == 1) { //sports background
            background(sportsBackground);
            //moved the big background code to BallViewer.js so it changes on click
        }
        if (this.selectbg == 2){ //fruit background
            background(fruitBackground);
        }
        if (this.selectbg == 0){
            background(runningBackground);
        }

        loadContainer();
        drawBalls();
        drawDashedLine();
        ToMenuButton.displayButton();
        this.displayScore();// for score
    
        if (this.gameOver) {
            this.handleGameOver(); // Handle game-over logic
            return; // Stop any more balls
        }
        if (timermenu.getTimerOn()) {
            runTimer();
        }
    }

    getBallCombinations() {
        return this.ballCombinations;
    }

    setBallCombinations(number) {
        this.ballCombinations = number;
    }

    getGameOver() {
        return this.gameOver;
    }

    makeGameOver() {
        this.gameOver = true;
        deleteSavedData();
    }

    makeGameNotOver() {
        this.gameOver = false;
    }

    //Set the running state to true
    setRunningTrue() {
        this.running = true;
    }

    //toggle the running state
    toggleRunning() {
        if (this.running == false) {
            this.running = true;
        } else {
            this.running = false;
            firstClick = true;
        }
    }

    //set the running state to false
    setRunningFalse() {
        firstClick = true;
        this.running = false;
    }

    resetBallArray() {
        this.BallArray = [];
        this.BallQueue = [];
    }

    //return the running state
    getRunningState() {
        return this.running;
    }

    setScore(value){
        this.score = value;
    }

    getBallArrayCopy(){
        let temp = []
        for (let i = 0; i < this.BallArray.length; i++) {
            temp.push(this.BallArray[i].makeCopy());
        }
        return temp;
    }

    setBallArray(balls) {
        this.BallArray = balls;
    }
    getBallQueue() {
        return this.BallQueue;
    }

    displayScore() { //forscore
    this.score = 0;
    for(let i = 0; i < this.BallArray.length; i ++){
        this.score = this.score + 2 ** this.BallArray[i].level;
    }
      this.score = this.score + (this.ballCombinations * 2)
      const pscoring = document.getElementById("scoring");
      pscoring.textContent = `Score: ${this.score}`;
    }
    addtoscore() { //forscore
        this.score +=2;
        this.displayScore();
    }

    setGameOverCause(string) {
        this.gameOverCause = string;
    }
       
  didBallmerge(){
    for (let i = 0; i < ballArray.length; i++) {
        for (let j = i + 1; j < ballArray.length; j++) {
            if (this.checkCollision(ballArray[i], ballArray[j])) {
            }
        }
    }
}
   checkCollision(ball1, ball2) {
    const dx = ball1.xlocation - ball2.xlocation;
    const dy = ball1.ylocation - ball2.ylocation;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const collisionDistance = (ball1.diameter / 2) + (ball2.diameter / 2);
    return distance < collisionDistance;

  }

 handleGameOver() {
    fill("black");
    stroke("white");
    rect(110, 175, 380, 140);
    noStroke();
    fill("white");
    textSize(32);
    textAlign(CENTER);
    if (this.gameOverCause === 'overstacked') {
        text("Overstacked, You Lose!", width / 2, height / 2 - 20); 
    } else {
        text("Out of Time! Game Over!", width / 2, height / 2 - 20); //Changing this for presentation will be changed back later
    }
    text(`Score: ${this.score}`, width / 2, height / 2 + 20); // Display the score
    scoringit.style.display = "none"; // Hide score display in the corner
    noFill();
}

}
    


