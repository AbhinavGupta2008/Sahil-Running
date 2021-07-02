var path,boy,cash,diamonds,jwellery,sword,sword2;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,swordImg2;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup,swordGroup2;
var endImg

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  swordImg2 = loadImage("sword.png");
}

function setup(){
  
    createCanvas(windowWidth,windowHeight);
  // Moving background
  path=createSprite(width/2,200);
  path.addImage(pathImg);
  path.velocityY = 6;


  //creating boy running
  boy = createSprite(width/2,height-70,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.addAnimation("GameOver",endImg);
  boy.scale=0.08;
  boy.setCollider("rectangle",0,0,1300,1300)


  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordGroup=new Group();
  swordGroup2=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
    createCash();
    createSword();
    createDiamonds();
    createJwellery();
    createSword2();
  

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+200;

      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+100;

      
    }else{
      if(swordGroup.isTouching(boy)||swordGroup2.isTouching(boy)) {
        gameState = END;
    }
    
  }
  }
   else if(gameState===END){
     boy.changeAnimation("GameOver",endImg)
     boy.scale=0.5
     boy.x=width/2
     boy.y=240
     swordGroup.destroyEach();
     swordGroup2.destroyEach();
     jwelleryG.destroyEach();
     cashG.destroyEach();
     diamondsG.destroyEach();
     path.velocityY=0
     swordGroup.setVelocityYEach(0)
     swordGroup2.setVelocityYEach(0)
     cashG.setVelocityYEach(0)
     diamondsG.setVelocityYEach(0)
     jwelleryG.setVelocityYEach(0)
     boy.setCollider("rectangle",0,0,420,boy.height)
     
     
    }
  
  drawSprites();
  
  textSize(20);
  fill("red")
  stroke("yellow")
  
  if(gameState===PLAY){
  text("Treasure: "+ treasureCollection +" C",(width/2)-55,30);
    }
  
  
  if(gameState===END){
    text("You Earned: "+treasureCollection+" C",(width/2)-70,300)
  }

}

function createCash() {
  if (World.frameCount % 100 == 0) {
  var cash = createSprite(Math.round(random(50,width -50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 6;
  cash.lifetime = 150;
  cashG.add(cash);
  cash.setCollider("rectangle",0,0,cash.width,cash.height)
  }
}

function createDiamonds() {
  if (World.frameCount % 220 == 0) {
  var diamonds = createSprite(Math.round(random(50,width -50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 6;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
  diamonds.setCollider("rectangle",0,0,diamonds.width,diamonds.height)
}
}

function createJwellery() {
  if (World.frameCount % 310 == 0) {
  var jwellery = createSprite(Math.round(random(50,width -50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 6;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  jwellery.setCollider("rectangle",0,0,jwellery.width,jwellery.height)
  }
}

function createSword(){
  if (World.frameCount % Math.round(random(150,250)) == 0) {
  var sword = createSprite(Math.round(random(50,width -50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 6;
  sword.lifetime = 150;
  swordGroup.add(sword);
    
  }
}

function createSword2(){
  if (World.frameCount % Math.round(random(150,250)) == 0) {
  var sword2 = createSprite(Math.round(random(50,width -50),40, 10, 10));
  sword2.addImage(swordImg);
  sword2.scale=0.1;
  sword2.velocityY = 6;
  sword2.lifetime = 150;
  swordGroup2.add(sword2);
    
  }
}