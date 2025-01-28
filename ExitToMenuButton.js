

var width;
var height;
var x;
var y;

class exit {


    constructor() {
        this.width = 30;
        this.height = 30;
        this.x = 560;
        this.y = 10;
    }

    displayButton() {
         stroke("red");
         fill("BLACK");
         rect(this.x, this.y, this.width, this.height);
         noStroke();
         fill("RED");
         textAlign(CENTER, CENTER);
         textSize(25);
         text("X", this.x + this.height / 2, this.y + this.width / 2 + 1);
     }
}