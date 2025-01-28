
var action;
var width;
var height;
var x;
var y;

class SettingsButton {


    constructor(action, x, y, width = 250, height = 30) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.action = action;
    }

    displayButton() {
         stroke(settingsMenu.getThemeColor());
         fill("BLACK");
         rect(this.x, this.y, this.width, this.height);
         noStroke();
         fill(settingsMenu.getThemeColor());
         textAlign(CENTER, CENTER);
         textSize(25);
         text(this.action, this.x + this.width / 2, this.y + this.height / 2 + 1);
     }

     getXmin() {
        return this.x;
     }

     getXmax() {
        return this.x + this.width;
     }

     getYmin() {
        return this.y;
     }

     getYmax() {
        return this.y + this.height;
     }

     getAction() {
        return this.action;
     }
}
