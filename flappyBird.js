//init
var canvas = document.querySelector("canvas");
var context = document.querySelector("canvas").getContext("2d");

//load images

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//variables
let gap = 95;
let constant = gap + pipeNorth.height;

let bX = 10; //bird x
let bY = 150; //bird y

let gravity = 1.5;

let score = 0;
//on key down
document.addEventListener("keydown", moveUp);

function moveUp() {
  bY -= 25;
}

//pipe cords
var pipe = [];

pipe[0] = {
  x: canvas.width,
  y: 0
};

//draw images

function draw() {
  context.drawImage(this.bg, 0, 0);

  for (var i = 0; i < pipe.length; i++) {
    context.drawImage(this.pipeNorth, pipe[i].x, pipe[i].y);
    context.drawImage(this.pipeSouth, pipe[i].x, pipe[i].y + constant);
    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: canvas.width,
        y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
      });
    }
    //collision
    if (
      (bX + bird.width >= pipe[i].x &&
        bX <= pipe[i].x + pipeNorth.width &&
        (bY <= pipe[i].y + pipeNorth.height ||
          bY + bird.height >= pipe[i].y + constant)) ||
      bY + bird.height >= canvas.height - fg.height
    ) {
      location.reload(); // reload the page
    }
    if (pipe[i].x == 5) {
      score++;
    }
  }
  context.drawImage(this.fg, 0, canvas.height - fg.height);

  context.drawImage(this.bird, bX, bY);

  bY += gravity;

  context.fillStyle = "#000";
  context.font = "20px monospace";
  context.fillText("Score : " + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}

draw();
