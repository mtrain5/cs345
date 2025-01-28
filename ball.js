//File for creating storing and updating an array of balls.
//Clicking only generates one type of ball at this time.


//bounds for the balls x and y position.
let leftBound = 100;
let rightBound = 500;
let jarBottom = 439;
let startY = 100;
let firstClick = true; //Boolean to track the click for the start button and make sure not to draw a ball on that click.
let isClickable = true;
let maxBallLevel = 11;
let ballCombinations = 0;
let DropTimer = 1000;
let imageX;
let imageY;
let radius;
let creationMoment;
const combiningsound = document.getElementById("combiningbleep");

//let listPlanets = [earthBackground, moonBackground];

//Ball object.
class Ball {
  constructor(level, x, y){
    this.level = level;
    this.diameter = 20.0 + level * 10.0; //I made the balls smaller again so that the ball viewer works again.
    this.xlocation = x;
    this.ylocation = y;
    this.speedX = 0;
    this.speedY = 0;
    this.radius = this.diameter / 2.0;
    this.color = 'white';
    this.creationMoment = new Date();
  }

  makeCopy() {
    let copy = new Ball(this.level, this.xlocation, this.ylocation);
    return copy;
  }

  //method for printing the ball to the screen.
  to_screen(){
    //putting the image to the screen.  This is pulled from the ball images i loaded into the games BallThemes.
    image(instance.BallThemes[instance.BallTheme][this.level-1], this.xlocation - this.radius - 1, this.ylocation - this.radius - 1);
  }

  getLevel() {
    return this.level;
  }

  getLost() {
    let current = (new Date()).getTime();
    if (current - 1750 > this.creationMoment.getTime()) {
      if (this.ylocation < FailingHeight + this.radius) {
        instance.setGameOverCause('overstacked');
        instance.makeGameOver();
      }
    }
  }

}



//Helper for making a ball within bounds.
function makeBall (level){
  //creates one ball with a score of level
  var randomNum = Math.random();
  var offset = 0;
  if (randomNum <= .2) {
    offset = -2;
  } else if (randomNum <= .4) {
    offset = -1
  } else if (randomNum <= .6) {
    offset = 1
  } else if (randomNum <= .8) {
    offset = 2
  }
  let ball = new Ball(level, mouseX + offset, startY);

  //Stops the ball from going to far left
  if( (ball.xlocation - (ball.diameter >> 1) ) < leftBound ){
    ball.xlocation = leftBound + (ball.diameter >> 1);
  }
  //Stops the ball from going to far right
  if( rightBound  < (ball.xlocation + (ball.diameter >> 1)) ){
    ball.xlocation = rightBound - (ball.diameter >> 1);
  }
  return ball
}

//Create a ball and add it to the list when a mouse is clicked
function mouseClicked() { 

  if(instance.getRunningState() == true && 
  !(mouseX > 560 && mouseX < 590 && mouseY > 10 && mouseY < 40) &&
  !(mouseX > 200 && mouseX < 400 && mouseY > 465 && mouseY < 495)) {//Only makes balls if the game is running and mouse is not over a button.


    if (!instance.getGameOver()) {
      if (firstClick) {
        firstClick = false;
        if (timermenu.getTimerOn()) {
          const d1 = new Date();
          if (saver.getSaved()) {
            TimerMax = d1.getTime() + saver.getTime() * 1000;
          } else {
            TimerMax = d1.getTime() + TimerSet * 1000;
          }
        }
      } else if (isClickable) {
        balltype = instance.BallQueue[instance.BallQueue.length - 1].level;
        instance.BallQueue.splice(instance.BallQueue.length - 1,1)
        instance.BallArray.push(makeBall(balltype));
        isClickable = false;
        setTimeout(() => {
          isClickable = true;
        }, DropTimer);//timer
      }
    }
  }
}

//topBall is the last element in the game's ball queue.
function drawTopBall(){
  topBall = instance.BallQueue[instance.BallQueue.length - 1];
  topBall.ylocation = startY
  topBall.xlocation = mouseX

    //Stops the ball from going to far left
    if( (mouseX - (topBall.diameter >> 1) ) < leftBound ){
      topBall.xlocation = leftBound + (topBall.diameter >> 1);
    }
    //Stops the ball from going to far right
    if( rightBound  < (mouseX + (topBall.diameter >> 1)) ){
      topBall.xlocation = rightBound - (topBall.diameter >> 1);
    }
  topBall.to_screen();
}

//Updates the balls current speed, and moves it if it can.
function moveMaybe(ballm,i){
  
  //Look through the list of balls to check for collisions.
  for (otherIndex=0; otherIndex< instance.BallArray.length; otherIndex++){
    temp = instance.BallArray[otherIndex]; 
    dy = ballm.ylocation - temp.ylocation;
    dx = ballm.xlocation - temp.xlocation;
    distance = sqrt(dx * dx + dy * dy);
    bouncedist = (ballm.diameter >>1) + (temp.diameter >>1);
    
    //detect collision
    if ( bouncedist >= distance -1 ){
        //skip the collision if it is with itself
        if (otherIndex != i){
          resolveOverlap(ballm, temp);
          angle = atan2(dy, dx);

          //new ball from collision
          if ((ballm.level == temp.level)){
            if (ballm.level == maxBallLevel) {
              instance.ballCombinations += 2049;
              startsound.play();
            } else {
            instance.BallArray.push( new Ball(ballm.level + 1, ballm.xlocation + ( .5 * dx) , ballm.ylocation + ( .5 * dy)) );
            instance.ballCombinations +=1;//update the total combinations
            combiningsound.play();
            //delete the other ball
            }
            if(otherIndex > i ){
              instance.BallArray.splice(otherIndex,1); // delete other ball. 
              instance.BallArray.splice(i,1); // delete this ball.
            }
            else{
              instance.BallArray.splice(i,1); // delete this ball.
              instance.BallArray.splice(otherIndex,1); // delete other ball. 
            }
            
            return null;
          }
        }
    }
  }

  //For stopping the ball at the bottom of the jar.
  if ( ballm.ylocation >= (jarBottom - (ballm.diameter >> 1) ) ){
    ballm.ylocation = jarBottom - (ballm.diameter >> 1); //Prevents the sinking
    ballm.speedY = -3;
    ballm.ylocation = (jarBottom - (ballm.diameter >> 1) );
  }

  //For stopping the ball at the left of the jar.
  if (ballm.xlocation <= leftBound + (ballm.diameter >> 1)){
    ballm.speedX = Math.abs(ballm.speedX) *.001 + .1;
    ballm.xlocation = leftBound + (ballm.diameter >> 1);

  }

  //For stopping the ball at the right of the jar.
  if ( ballm.xlocation >= (rightBound - (ballm.diameter >> 1) ) ){
    ballm.speedX = -Math.abs(ballm.speedX) *.001 - .1;
    ballm.xlocation = (rightBound - (ballm.diameter >> 1) );
  }

  
  ballm.speedY = ballm.speedY * .175 + 3;  //This line controlls gravity
  //these dampen movement.
  ballm.speedX = ballm.speedX *.95;
  


  //These ifs are for stopping small movements.
  if ( ballm.speedY <= 0){
    ballm.ylocation = Math.ceil(ballm.ylocation + Math.ceil(ballm.speedY));
  }
  if ( ballm.speedY >= 0){
    ballm.ylocation = Math.floor(ballm.ylocation + Math.floor(ballm.speedY));
  }

  if ( ballm.speedX <= 0){
    ballm.xlocation = Math.ceil(ballm.xlocation + Math.ceil(ballm.speedX));
  }
  if( ballm.speedX >= 0){
    ballm.xlocation = Math.floor(ballm.xlocation + Math.floor(ballm.speedX));
  }
}

function checkQueue(){
  if (instance.BallQueue.length < 4){//Three ball queue new ball goes at 0. The last ball follows the mouse.
    let random = (Math.random());
    if (random < .25) {
      random = .25;
    }
    let newBall = new Ball(Math.floor((random) * instance.MaxRandomBall), 100, 50); //This line controlls the max level for the new ball.
    newBall.ylocation = 10 + (newBall.diameter >> 1)
    instance.BallQueue = [newBall].concat(instance.BallQueue); 
  }
  //Draw Queue
  queueIndex = 15;// 15 is how far the first ball is from the edge of the screen.
  for(i = 0; i < instance.BallQueue.length - 1 ; i++){ //Draw all but the last Ball.
    temp = instance.BallQueue[i];
    queueIndex = queueIndex + (temp.diameter >> 1);
    temp.xlocation = queueIndex;
    queueIndex = queueIndex + (temp.diameter >> 1) + 10; // 10 is the space between balls in the queue
    if(instance.displayQueue){
      temp.to_screen();
    }
  }
}

function resolveOverlap(ball1, ball2) {
  const dx = ball1.xlocation - ball2.xlocation;
  const dy = ball1.ylocation - ball2.ylocation;
  const distance = sqrt(dx * dx + dy * dy);
  const minDist = ball1.radius + ball2.radius;

  // If balls are overlapping, move them apart
  if (distance < minDist) {
    const overlap = minDist - distance + 1;
    const angle = atan2(dy, dx);

    // Move the balls apart by the amount of overlap
    const moveX = cos(angle) * overlap * 0.5;
    const moveY = sin(angle) * overlap * 0.5;

    ball1.xlocation += moveX;
    ball1.ylocation += moveY;

    ball2.xlocation -= moveX;
    ball2.ylocation -= moveY;
  }
}



//Iterate through the list of balls, maybe move and draw each one.
function drawBalls(){
  checkQueue();
  drawTopBall();
  //Iterate through the list
  for(i = 0; i < instance.BallArray.length; i++){
     temp = instance.BallArray[i];
     temp.to_screen();    // print the ball
     temp.getLost();
     moveMaybe(temp,i);     // maybe move the ball
  }
}

function setColor(color) {
  this.color = color;
}

function setLevel(level) {
  this.level = level;
}

function getDiameter() {
  return this.diameter;
}

function getX(){
  return this.xlocation;
}

function getY(){
  return this.ylocation;
}


