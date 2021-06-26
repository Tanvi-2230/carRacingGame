var db;
var gameState = 0, playerCount = 0;
var game, form,player;
var allPlayers;
var car1, car2, car3, car4;
var cars = [];
var car1Img, car2Img, car3Img, car4Img, groundImg, trackImg;
var endMsg;
var carsAtEnd;

function preload(){

    car1Img = loadImage("images/car1.png");
    car2Img = loadImage("images/car2.png");
    car3Img = loadImage("images/car3.png");
    car4Img = loadImage("images/car4.png");
    groundImg = loadImage("images/ground.png");
    trackImg = loadImage("images/track.jpg");

}

function setup(){
    createCanvas(windowWidth-50, windowHeight-50);
   
    db = firebase.database();
    game = new Game();
    game.getState();
    game.start();

    endMsg = false;
}

function draw(){
    //background("white");
  if(playerCount === 4 && gameState === 0){
      game.updateState(1);
  }
  if(gameState === 1){
      clear();
      game.play();
  }

  if(gameState === 2){
      game.end();
  }
}