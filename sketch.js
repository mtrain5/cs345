// ICON CREDITS
// Fruit Icons by greywolfentertainment on itch.io
// link to their page to download the icons: https://greywolfentertainment.itch.io/fruit-icon-set 


let instance = new Game(); //single instance of Game.
let settingsMenu = new SettingsMenu(); //single instance of settings menu
let ballViewer = new BallViewer(); //single instance of ball viewer
let timermenu = new TimerMenu();
let saver = new saveButton();
let backgroundMusic;
let settingsAndExitButtonNoise;

var quit = false;
var exitable = true; //there is an exitable situation in which the exit to menu button could be pressed.


function setup() {
  createCanvas(600, 500);
  textAlign(CENTER, TOP); //Makes it easier to place text.
}

function preload() {
  //visuals:
  menuBackground = loadImage('assets/MenuBackground.png');
  runningBackground = loadImage('assets/runningBackground.png');
  sportsBackground = loadImage('assets/sportbackground.png');
  fruitBackground = loadImage('assets/fruit_background.png');
  natureBackground = loadImage('assets/nature_background.png'); // for the fruit theme menu

  //audio:
  backgroundMusic = new Audio('assets/happy_sound.mp3');
  settingsAndExitButtonNoise = new Audio('assets/sounds/Hitmarker sound.wav');
  backgroundMusic.volume = 0.025;
  settingsAndExitButtonNoise.volume = 0.10;
 


  //planet images in order
  //I manually resized them. Now .resize() doesn't have to be called on 
  //every drawing.  I made the list part of the game object.  
  instance.BallThemes = [
  [loadImage('assets/planets/plutoResize.png'),
    loadImage('assets/planets/moonResize.png'),
    loadImage('assets/planets/earthResize.png'),
    loadImage('assets/planets/venusResize.png'),
    loadImage('assets/planets/marsResize.png'),
    loadImage('assets/planets/jupiterResize.png'),
    loadImage('assets/planets/neptuneResize.png'),
    loadImage('assets/planets/mercuryResize.png'),
    loadImage('assets/planets/sunResize.png'),
    loadImage('assets/planets/deathStarResize.png'),
    loadImage('assets/planets/MustafarResize.png')],
    [loadImage('assets/sports/golf.png'), // this second array is where I'll put the sports balls.
      loadImage('assets/sports/eight.png'),
      loadImage('assets/sports/tennis.png'),
      loadImage('assets/sports/pickle.png'),
      loadImage('assets/sports/baseball.png'),
      loadImage('assets/sports/hand.png'),
      loadImage('assets/sports/bowling.png'),
      loadImage('assets/sports/basketball.png'),
      loadImage('assets/sports/soccer.png'),
      loadImage('assets/sports/volleyball.png'),
      loadImage('assets/sports/beach.png')],
    [loadImage('assets/fruits/kiwi.png'), // third array for fruits, currently not working
      loadImage('assets/fruits/apple.png'),
      loadImage('assets/fruits/orange.png'),
      loadImage('assets/fruits/peach.png'),
      loadImage('assets/fruits/pomegranate.png'),
      loadImage('assets/fruits/coconut.png'),
      loadImage('assets/fruits/mango.png'),
      loadImage('assets/fruits/plum.png'),
      loadImage('assets/fruits/lemon.png'),
      loadImage('assets/fruits/dragonfruit.png'),
      loadImage('assets/fruits/green_apple.png')]];

  // I eventually want this to be the start button but need to integrate it into what we already have - emily
  //pixelStart = loadImage('assets/pixel_forrealthistime.png');

}
function draw() {
  if (instance.getRunningState() == true) { //If the game has started,
    instance.run();     //draw the game
    saver.displayButton();
    exitable = true;
  } else {
    //otherwise draw the menu.
    if (instance.selectbg == 1){
      background(sportsBackground);
      fill("black");
      stroke("tan");
      rect(180, 200, 240, 125);
      noFill();
      noStroke();
      menuContainer.style.color = "tan";
    }
    if (instance.selectbg == 2){
      background(fruitBackground);
      fill("black");
      stroke("lightblue");
      rect(180, 200, 240, 125);
      noFill();
      noStroke();
      menuContainer.style.color = "lightblue";
    }
    if (instance.selectbg == 0){
      background(menuBackground);
      menuContainer.style.color = "#B41297";
    }       
  }
  if (settingsMenu.getOpen()) {
    settingsMenu.runSettingsMenu();
    if (ballViewer.getOpen()) {
      ballViewer.runBallViewer();
    }
    if (timermenu.getOpen()) {
      timermenu.runTimerMenu();
    }
  }
  if (instance.musicOn) {
    backgroundMusic.play();
  }
}