var player;
var playerImage
var ground;
var groundImage;
var invisbleGround;
var zombie1Image;
var zombie2Image;
var zombie3Image;
var zombie4Image;
var playerhit1;
var zombieGroup;
var gameState=0;
var swordImage;
var score=0;
var distance=0;
var CoinImage;
var coinGroup;
var coinsCollected=0;
function preload(){
playerImage=loadAnimation("player1.png","player2.png") 
playerhit1=loadAnimation("playerhit1.png","playerhit2.png")
groundImage=loadImage("Ground Image.png") 
zombie1Image=loadImage("zombie1.png")
zombie2Image=loadImage("zombie2.png")
zombie3Image=loadImage("zombie3.png")
zombie4Image=loadImage("zombie4.png")
swordImage=loadImage("swordImage.png")
CoinImage=loadAnimation("Coin1.png","Coin2.png","Coin3.png","Coin4.png","Coin5.png","Coin6.png")
}

function setup() {
  createCanvas(800, 800);
 ground = createSprite(600,780,2000,20)
 player = createSprite(50,180,20,50);
 invisibleGround=createSprite(600,780,2000,20);
  player.addAnimation("player",playerImage)
  ground.addImage(groundImage);
  ground.velocityX=-3;
  ground.scale=1.5;
  invisibleGround.visible=false;
  zombieGroup= new Group();
  swordGroup= new Group();
  coinGroup= new Group();
}

function draw() {
  //trex.debug = true;
  background("blue");
  textSize(25);
  fill("red");
  text("ZOMBIES KILLED:"+score,50,100)
  if(frameCount%20===0){
    distance=distance+1;
  }
  text("DISTANCE TRAVELED:"+distance+" meters",400,100)
  text("COINS COLLECTED:"+coinsCollected,200,200)
  if(keyDown("right")){
  player.x=player.x+2; 
  }
  if(keyDown("space")){
    player.velocityY=-12;
  }
  player.velocityY=player.velocityY+0.8;
  player.collide(invisibleGround);
  if(ground.x<200){
    ground.x=600;
  }
  if(keyDown("a")){
    createSword();
  }
  if(player.isTouching(zombieGroup)){
    gameState=1;

  }
  if(swordGroup.isTouching(zombieGroup)){
    score=score+1;
    zombieGroup.destroyEach();
    swordGroup.destroyEach();
    
  }
  if(player.isTouching(coinGroup)){
   coinsCollected=coinsCollected+1;
   coinGroup.destroyEach();
  }
  if(gameState===1){
    background(0);
    player.destroy();
    ground.destroy();
    zombieGroup.destroyEach();
    coinGroup.destroyEach();
    textSize(40);
    fill("blue");
    text("GAME OVER",325,400);
  }
  spawnZombies();
  spawnCoins();
  drawSprites();
}
function createSword(){
  sword=createSprite(50,700,50,50)
  sword.velocityX=4;
  sword.addImage(swordImage);
  sword.scale=0.1
  swordGroup.add(sword);
}
function spawnZombies(){
  if(frameCount%230 ===0){
  zombie = createSprite(700,720,20,50); 
  zombie.velocityX=-(6+distance/50);
  zombie.scale=0.2
  var rand=Math.round(random(1,4))
  switch(rand){
    case 1:zombie.addImage(zombie1Image);
    break;
    case 2:zombie.addImage(zombie2Image);
    break; 
    case 3:zombie.addImage(zombie3Image);
    break;
    case 4:zombie.addImage(zombie4Image);
    break;
  }
  zombieGroup.add(zombie);
}
}
function spawnCoins(){
  if(frameCount%200===0){
    coin= createSprite(500,500,50,50)
    coin.velocityX=-3
    coin.addAnimation("coin",CoinImage)
    coin.scale=0.8;
    coinGroup.add(coin);
  }
}
